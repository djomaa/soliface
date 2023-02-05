import React, { useCallback, useDeferredValue, useEffect } from 'react';
import { PromiEvent, TransactionReceipt } from 'types/abi';
import { useLogger } from './use-logger';

// enum Status {
//   Pending = 'pending',
//   Sending = 'sending',
//   Sent = 'sent',
//   TxHash = 'txHash',
//   Confirmation = 'confirmation',
//   Receipt = 'receipt',
// }

export type TxStatus = 'pending' | 'sending' | 'sent' | 'txHash';

export const TxStatusWeight: Record<TxStatus, number> = {
  pending: 0,
  sending: 1,
  sent: 2,
  txHash: 3,
}

let id = 0;
export const usePromiEvent = () => {
  const [Logger] = useLogger(usePromiEvent);

  const [pe, setPe] = React.useState<PromiEvent<TransactionReceipt>>();

  const [error, setError] = React.useState<Error>();
  const [status, setStatus] = React.useState<TxStatus>();
  const [txHash, setTxHash] = React.useState<string>();
  const [receipt, setReceipt] = React.useState<TransactionReceipt>();
  const [confirmations, setConfirmations] = React.useState<number>();
  const defConfirmations = useDeferredValue(confirmations);

  const clear = useCallback((status: TxStatus | undefined) => {
    setError(undefined);
    setTxHash(undefined);
    setReceipt(undefined);
    setConfirmations(undefined);
    setStatus(status);
  }, []);

  useEffect(() => {
    if (!pe) {
      clear(undefined);
      return;
    }
    clear('pending');
    const logger = Logger.sub(id++);
    pe.once('error', (error) => {
      logger.log('error', error);
      setError(error);
    });
    pe.once('sending', () => {
      logger.debug('sending');
      setStatus('sending');
    });
    pe.once('sent', () => {
      logger.debug('sent');
      setStatus('sent');
    })
    pe.once('transactionHash', (txHash) => {
      logger.debug('transactiomHash', txHash);
      setStatus('txHash');
      setTxHash(txHash);
    })
    pe.once('confirmation', (_, receipt) => {
      logger.log('receipt (from confirmation event)', receipt);
      setReceipt(receipt);
    });
    pe.on('confirmation', (confirmationNumber, _receipt, latestBlockHash) => {
      logger.log('confirmation', { confirmationNumber, latestBlockHash });
      setConfirmations(confirmationNumber);
    });

    logger.debug('Subscribed', pe);

    return () => {
      // TODO:- add type to web3.PromiEvent
      // @ts-ignore
      pe.removeAllListeners();
      clear(undefined);
      logger.debug('Unsubscribed', pe);
    }
  }, [pe]);

  const state = React.useMemo(() => {
    if (!status) {
      return;
    }
    return {
      error,
      status,
      statusWeight: TxStatusWeight[status],
      txHash,
      receipt,
      confirmations: defConfirmations,
      ready: !!receipt || !!error
    }
  }, [error, status, txHash, receipt, defConfirmations])


  return [state, setPe] as const;

};

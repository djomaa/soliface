import { PromiEvent, TransactionReceipt } from 'web3-core';
import React, { useEffect, useMemo, useState } from 'react'

import List from '@mui/material/List';
import Alert, { AlertProps } from '@mui/material/Alert';
import Tooltip from '@mui/material/Tooltip';
import ListItem from '@mui/material/ListItem';
import AlertTitle from '@mui/material/AlertTitle';
import ListItemText from '@mui/material/ListItemText';
import CircularProgress from '@mui/material/CircularProgress';

import { useLogger } from 'hooks/use-logger';
import styles from 'styles/common.module.scss'
import { IAction } from 'hooks/use-async-action';
import { FalseReceiptStatusDescription } from 'constants/text.constants';

import { parseActionError } from '../base';
import { TxHashSection } from './tx-hash.section';
import { ReceiptSection } from './receipt.section';

interface iProps {
  action: IAction<{ promiEvent: PromiEvent<any> }>;
}
const MIN_CONFIRMATION = 3;

enum Status {
  Empty,
  Generation,
  TxHash,
  Receipt,
  Confirmation,
  Done,
}

const StatusText: Record<Status, string> = {
  [Status.Empty]: '', // only as type fix
  [Status.Done]: 'Success',
  [Status.Generation]: 'Forming transaction..',
  [Status.TxHash]: 'Waiting for transaction hash..',
  [Status.Receipt]: 'Waiting for transaction to be mined..',
  [Status.Confirmation]: 'Waiting for confirmations..',
}

export const WriteResult: React.FC<iProps> = ({ action }) => {
  const [logger] = useLogger(WriteResult, action.id);

  const [txHash, setTxHash] = useState<string>();
  const [receipt, setReceipt] = useState<TransactionReceipt>();
  const [confirmations, setConfirmation] = useState<number>(0);

  useEffect(() => {
    logger.debug('Action id changed', action?.id);
    setTxHash(undefined);
    setReceipt(undefined);
    setConfirmation(0);
  }, [action?.id])

  const status = useMemo(() => {
    if (!action) {
      return Status.Empty;
    }
    if (action.loading) {
      return Status.Generation;
    }
    if (!txHash) {
      return Status.TxHash;
    }
    if (!receipt) {
      return Status.Receipt;
    }
    if (confirmations < MIN_CONFIRMATION) {
      return Status.Confirmation;
    }
    return Status.Done;
  }, [action, receipt, confirmations]);

  useEffect(() => {
    if (!action?.result) {
      return;
    }
    const { promiEvent } = action.result;
    const id = action.id;
    promiEvent
      .once('transactionHash', (txHash) => {
        logger.log('txHash', txHash);
        setTxHash(txHash);
      })
      .once('receipt', (receipt) => {
        logger.log('receipt', receipt);
        receipt.status = false;
        setReceipt(receipt);
      })
      .on('confirmation', (value: number) => {
        logger.log('Confirmation received', id, value);
        setConfirmation(value);
        if (value > MIN_CONFIRMATION) {
          logger.log('Unsubscribe from confirmation');
          // @ts-ignore
          promiEvent.off('confirmation');
        }
      })
  }, [action.id]);

  const body = useMemo(() => {
    if (action?.error) {
      logger.error('Generation error');
      logger.error(action.error);
      return parseActionError(action.error).body;
    }
    return (
      <List>
        {txHash && (
          <ListItem>
            <ListItemText
              primary='Transaction hash'
              secondary={<TxHashSection txHash={txHash} />}
            />
          </ListItem>
        )}
        {receipt && (
          <ListItem>
            <ListItemText
              primary='Receipt'
              secondary={<ReceiptSection receipt={receipt} />}
            />
          </ListItem>
        )}
        {txHash && receipt && (
          <ListItem>
            <ListItemText
              primary='Confirmation number'
              secondary={confirmations}
            />
          </ListItem>
        )}
      </List>
    )
  }, [txHash, receipt, confirmations]);

  const [severity, variant] = useMemo<[AlertProps['severity'], AlertProps['variant']]>(() => {
    if (action?.error) {
      return ['error', undefined];
    }
    if (receipt && !receipt.status) {
      return ['warning', undefined];
    }
    if (status === Status.Done) {
      return ['success', 'outlined'];
    }
    return ['info', 'outlined'];
  }, [action, receipt, confirmations]);

  const isLoading = useMemo(() => {
    return status > Status.Empty && status < Status.Done;
  }, [status]);

  const title = useMemo(() => {
    if (action?.error) {
      return parseActionError(action.error).title;
    }
    if (receipt && !receipt.status) {
      return (
        <Tooltip title={FalseReceiptStatusDescription}>
          <span>Transaction receipt status is false</span>
        </Tooltip>
      )
    }
    return StatusText[status];
  }, [status]);

  if (!action) {
    return (<></>);
  }

  return (
    <Alert
      severity={severity}
      variant={variant}
      {...(isLoading ? { icon: <CircularProgress size={20} /> } : undefined)}
      {...(severity === 'success' ? { className: styles.AlertSuccessContentFullWidth } : undefined)}
    >
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  )

}


import React from 'react';
import { useCallback, useMemo } from 'react';

import { Status, useChainCtx } from 'contexts/chain';
import { useLogger } from 'hooks/use-logger';

import { IHandler } from '../handler';
import { useFunctionCtx } from '../../ctx'
import { ArgumentsObject } from '../../ctx/function.ctx-types';
import { WriteResult } from './write.result';
import { useContractCtx } from 'contexts/contract';

export const useWriteHandler = () => {
  const [Logger] = useLogger(useWriteHandler);

  const { web3, status, wallet, account } = useChainCtx();
  const { address } = useContractCtx();
  const { abi, inputsForm, txConfForm, setResult } = useFunctionCtx();
  // const f = useWatch(())
  const from = txConfForm.watch('from');

  const perform = useCallback(({ params }: ArgumentsObject) => {
    const logger = Logger.sub(perform.name);
    const txConf = txConfForm.getValues()
    txConf.from = from;
    txConf.to = address;
    console.log("🚀 ~ file: use-write.handler.tsx:31 ~ useWriteHandler ~ account", account)
    logger.debug('Encoding abi', { abi, web3, params, txConf });
    setResult(<WriteResult abi={abi} args={params} txConf={txConf} />);
  }, [abi, address, account, from]);

  const onSubmit = useMemo(() => {
    return inputsForm.handleSubmit(perform);
  }, [perform]);

  const disableReason = useMemo(() => {
    if (status !== Status.Connected) {
      return 'Not connected to network'
    }
    if (!address) {
      return 'Contract not selected'
    }
    if (!wallet) {
      return 'Wallet not connected';
    }
  }, [web3, from, address]);

  const handler: IHandler = useMemo(() => {
    return {
      name: 'Write',
      tooltip: disableReason,
      disabled: !!disableReason,
      onSubmit: onSubmit,
    };
  }, [disableReason, onSubmit]);

  return { writeHandler: handler };

}

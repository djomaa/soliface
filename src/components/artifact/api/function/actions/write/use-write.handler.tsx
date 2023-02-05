
import React from 'react';
import { useCallback, useMemo } from 'react';

import { useLogger } from 'hooks/use-logger';
import { useContractCtx } from 'contexts/contract';
import { Status, useChainCtx } from 'contexts/chain';

import { IHandler } from '../handler';
import { useFunctionCtx } from '../../ctx'
import { WriteResult } from './write.result';
import { ArgumentsObject } from '../../ctx/function.ctx-types';

export const useWriteHandler = () => {
  const [Logger] = useLogger(useWriteHandler);

  const { address } = useContractCtx();
  const { status, wallet, account } = useChainCtx();
  const { abi, inputsForm, txConfForm, setResult } = useFunctionCtx();

  const perform = useCallback(({ params }: ArgumentsObject) => {
    const logger = Logger.sub(perform.name);
    const txConf = txConfForm.getValues();
    txConf.to = address;
    logger.debug('Encoding abi', { abi, params, txConf });
    setResult(<WriteResult abi={abi} args={params} txConf={txConf} />);
  }, [abi, address, account, txConfForm]);

  const onSubmit = useMemo(() => {
    return inputsForm.handleSubmit(perform);
  }, [perform, inputsForm]);

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
  }, [status, address, wallet]);

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

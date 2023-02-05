
import React from 'react';
import { useCallback, useMemo } from 'react';

import { useLogger } from 'hooks/use-logger';
import { useContractCtx } from 'contexts/contract';
import { Status, useChainCtx } from 'contexts/chain';

import { IHandler } from '../handler';
import { useFunctionCtx } from '../../ctx'
import { CallResult } from './call.result';
import { ArgumentsObject } from '../../ctx/function.ctx-types';

export const useCallHandler = () => {
  const [Logger] = useLogger(useCallHandler);

  const { status } = useChainCtx();
  const { address } = useContractCtx();
  const { abi, inputsForm, txConfForm, setResult } = useFunctionCtx();

  const perform = useCallback(({ params }: ArgumentsObject) => {
    const logger = Logger.sub(perform.name);
    const txConf = txConfForm.getValues()
    txConf.to = address;
    logger.debug('Calling', { abi, params, txConf });
    setResult(<CallResult abi={abi} args={params} txConf={txConf} />);
  }, [abi, address,]);

  const onSubmit = useMemo(() => {
    return inputsForm.handleSubmit(perform);
  }, [perform, inputsForm]);

  const disableReason = useMemo(() => {
    if (status !== Status.Connected) {
      return 'Not connected to network'
    }
    if (!address) {
      return 'No contract selected';
    }
  }, [status, address]);

  const handler: IHandler = useMemo(() => {
    return {
      name: 'Call',
      tooltip: disableReason,
      disabled: !!disableReason,
      onSubmit: onSubmit,
    };
  }, [disableReason, onSubmit]);

  return { callHandler: handler };

}

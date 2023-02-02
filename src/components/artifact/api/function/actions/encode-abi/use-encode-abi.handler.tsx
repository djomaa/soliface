import assert from 'assert';
import { useChainCtx } from 'contexts/chain';
import { useLogger } from 'hooks/use-logger';
import React from 'react';
import { useCallback, useMemo } from 'react';
import { UnknownErrorAlert } from 'utils/error/alert';
import { useFunctionCtx } from '../../ctx'
import { Arguments } from '../../ctx/function.ctx-types';
import { IHandler } from '../handler';
import { EncodeAbiResult } from './encode-abi.result';

export const useEncodeAbiAction = () => {
  const [Logger] = useLogger(useEncodeAbiAction);

  const { web3, status } = useChainCtx();
  const { abi, inputsForm, setResult } = useFunctionCtx();

  const perform = useCallback((args: Arguments) => {
    const logger = Logger.sub(perform.name);
    logger.debug('Encoding abi', { abi, web3, args });
    assert(web3);
    try {
      const data = web3.eth.abi.encodeFunctionCall(abi, args);
      setResult(<EncodeAbiResult data={data} />)
    } catch (error) {
      setResult(<UnknownErrorAlert error={error} />)
    }
  }, [abi]);

  const onSubmit = useMemo(() => {
    return inputsForm.handleSubmit(perform);
  }, [perform]);

  const disableReason = useMemo(() => {
    if (!status) {
      return 'Not connected to network'
    }
  }, [web3]);

  const handler: IHandler = useMemo(() => {
    return {
      name: 'Encode ABI',
      tooltip: disableReason,
      disabled: !!disableReason,
      onSubmit: onSubmit,
    };
  }, [disableReason, onSubmit]);

  return { encodeAbiHandler: handler };

}

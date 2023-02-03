import React from 'react';
import assert from 'assert';
import { useCallback, useMemo } from 'react';

import { useChainCtx } from 'contexts/chain';
import { useLogger } from 'hooks/use-logger';
import { UnknownErrorAlert } from 'utils/error/alert';

import { IHandler } from '../handler';
import { useFunctionCtx } from '../../ctx'
import { EncodeAbiResult } from './encode-abi.result';
import { ArgumentsObject } from '../../ctx/function.ctx-types';

export const useEncodeAbiAction = () => {
  const [Logger] = useLogger(useEncodeAbiAction);

  const { web3, status } = useChainCtx();
  const { abi, inputsForm, setResult } = useFunctionCtx();

  const perform = useCallback(({ params }: ArgumentsObject) => {
    const logger = Logger.sub(perform.name);
    logger.debug('Encoding abi', { abi, web3, params });
    assert(web3);
    try {
      const data = web3.eth.abi.encodeFunctionCall(abi, params);
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

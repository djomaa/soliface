import Web3 from 'web3';
import { useCallback } from 'react';
import { useWeb3Context } from 'web3-react';
import { Web3Context } from 'web3-react/dist/context';
import { EncodeFailedAbiCoderError } from './abi-coder.errors';
import { abiCoder } from 'helpers/abi';

type EncodeFunctionCall = Web3['eth']['abi']['encodeFunctionCall'];

interface IWeb3Context extends Web3Context {
  library: Web3;
}

export const useChainCtx = () => {
  return useWeb3Context() as IWeb3Context;
}

export const useWeb3 = () => {
  const ctx = useChainCtx();
  return ctx.library;
}

export const useBaseAbiCoder = () => {
  return abiCoder;
}


export const useWeb3SafeAbiCoder = () => {
  const web3 = useWeb3();
  const encodeFunctionCall = useCallback((...params: Parameters<EncodeFunctionCall>): ReturnType<EncodeFunctionCall> => {
    try {
      const result = web3.eth.abi.encodeFunctionCall(...params);
      return result;
    } catch (error) {
      throw new EncodeFailedAbiCoderError(error as Error);
    }
  }, [web3]);

  return { encodeFunctionCall };
}

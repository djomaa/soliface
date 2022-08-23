import Web3 from 'web3';
import { useCallback, useContext } from 'react';
import { useWeb3Context } from 'web3-react';
// import { Web3Context } from 'web3-react/dist/context';
import { EncodeFailedAbiCoderError } from './abi-coder.errors';
import { abiCoder } from 'helpers/abi';
import { Web3Context } from './web3.context';

type EncodeFunctionCall = Web3['eth']['abi']['encodeFunctionCall'];

export const useChainCtx = () => {
  const ctx = useContext(Web3Context!)
  if (!ctx) {
    throw new Error('useChainCtx: Web3Context is null');
  }
  return ctx;
}

export const useWeb3 = () => {
  const ctx = useChainCtx();
  return ctx.web3;
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

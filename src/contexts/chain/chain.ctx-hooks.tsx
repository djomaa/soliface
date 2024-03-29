import Web3 from 'web3'
import { useCallback } from 'react'

import { abiCoder } from 'helpers/abi/signature-hash'
import { createUseCtx } from 'contexts/ctx-factory'

import { ChainCtx } from './chain.ctx'
import { EncodeFailedAbiCoderError } from './abi-coder.errors'

type EncodeFunctionCall = Web3['eth']['abi']['encodeFunctionCall']

export const useChainCtx = createUseCtx(ChainCtx, 'ChainCtx');

/**
 * @deprecated
 */
export const useWeb3Old = () => {
  const ctx = useChainCtx()
  return ctx.web3!
}

export const useWeb3 = () => {
  const ctx = useChainCtx()
  return { web3: ctx.web3 };
}

export const useBaseAbiCoder = () => {
  return abiCoder
}

export const useWeb3SafeAbiCoder = () => {
  const web3 = useWeb3Old()
  const encodeFunctionCall = useCallback((...params: Parameters<EncodeFunctionCall>): ReturnType<EncodeFunctionCall> => {
    try {
      const result = web3.eth.abi.encodeFunctionCall(...params)
      return result
    } catch (error) {
      throw new EncodeFailedAbiCoderError(error as Error)
    }
  }, [web3])

  return { encodeFunctionCall }
}

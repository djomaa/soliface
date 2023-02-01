import React, { useMemo, useEffect } from 'react'

import Tooltip from '@mui/material/Tooltip'
import LoadingButton from '@mui/lab/LoadingButton'

import { useContractCtx } from 'contexts/contract'
import { useAsyncAction } from 'hooks/use-async-action'
import { useChainCtx, useWeb3, useWeb3SafeAbiCoder } from 'contexts/chain'

import { useMethodCtx } from '../method.context'
import { IMethodActionConf } from '../types'
import { WriteResult } from '../result/write/write.result'

export const WriteAction: React.FC = () => {
  const { abi, form, setResult } = useMethodCtx()
  const contractCtx = useContractCtx()
  const chainCtx = useChainCtx()
  const web3 = useWeb3()
  const safeAbiCoder = useWeb3SafeAbiCoder()

  const [action, perform] = useAsyncAction(async (res: IMethodActionConf) => {
    const data = safeAbiCoder.encodeFunctionCall(abi, res.params)
    const txConf = {
      from: chainCtx.account,
      to: contractCtx.address,
      data
    }
    const [gas, gasPrice, nonce] = await Promise.all([
      res.tx.gas ?? web3.eth.estimateGas(txConf),
      res.tx.gasPrice ?? web3.eth.getGasPrice(),
      res.tx.nonce ? Number(res.tx.nonce) : web3.eth.getTransactionCount(txConf.from)
    ])
    const promiEvent = web3.eth.sendTransaction({
      from: chainCtx.account,
      to: contractCtx.address,
      data,
      gas,
      gasPrice,
      nonce
    })
    return { promiEvent }
  }, [web3, abi])

  useEffect(() => {
    if (action == null) {
      return
    }
    setResult(<WriteResult action={action} />)
  }, [action])

  const disabledReason = useMemo(() => {
    if (chainCtx.wallet == null) {
      return 'Wallet not connected'
    }
    if (!contractCtx.address) {
      return 'Address not set'
    }
    if (!web3) {
      return 'Web3 not connected'
    }
  }, [contractCtx.address, web3])

  const callButton = (
    <LoadingButton
      type="submit"
      onClick={form.handleSubmit(perform)}
      variant='outlined'
      loading={action?.loading}
      disabled={!!disabledReason}
    >
      Write
    </LoadingButton>
  )

  if (!disabledReason) {
    return callButton
  }

  return (
    <Tooltip title={disabledReason}>
      <span>
        {callButton}
      </span>
    </Tooltip>
  )
}

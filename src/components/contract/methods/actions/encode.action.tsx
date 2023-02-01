import React, { useMemo, useEffect } from 'react'

import Tooltip from '@mui/material/Tooltip'
import LoadingButton from '@mui/lab/LoadingButton'

import { useContractCtx } from 'contexts/contract'
import { useAsyncAction } from 'hooks/use-async-action'
import { useWeb3, useWeb3SafeAbiCoder } from 'contexts/chain'

import { useMethodCtx } from '../method.context'
import { IMethodActionConf } from '../types'
import { EncodeResult } from '../result/encode'

export const EncodeAction: React.FC = () => {
  const { abi, form, setResult } = useMethodCtx()
  const contractCtx = useContractCtx()
  const web3 = useWeb3()
  const safeAbiCoder = useWeb3SafeAbiCoder()

  const [action, perform] = useAsyncAction(async (res: IMethodActionConf) => {
    const { params, tx } = res
    console.log('params', params)
    const data = safeAbiCoder.encodeFunctionCall(abi, params)
    return data
  }, [web3, abi])

  useEffect(() => {
    if (action == null) {
      return
    }
    setResult(<EncodeResult action={action} />)
  }, [action])

  const disabledReason = useMemo(() => {
    return
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
      Encode
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

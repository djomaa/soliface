import React from 'react'
import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

import { useContractCtx } from 'contexts/contract'
import { useBaseAbiCoder } from 'contexts/web3'

import { ContractMethod } from './method'
import { ContractConfig } from './config'

export const Contract: React.FC = () => {
  const ctx = useContractCtx()
  const abiCoder = useBaseAbiCoder()

  const { artifact } = ctx
  const methods = artifact?.abi.filter((item) => item.type !== 'event')

  return (
    <>
      <Box
        sx={{ mb: 6 }}
      >
        <ContractConfig />
      </Box>
      {(methods != null)
        ? methods.map((item) => {
          const fullName = abiCoder.encodeFunctionSignature(item)
          return (
          <ContractMethod key={fullName} abi={item} />
          )
        })
        : (
        <Box>
          <Skeleton variant="rectangular" height={100} />
          <br />
          <Skeleton variant="rectangular" height={100} />
          <br />
          <Skeleton variant="rectangular" height={100} />
          <br />
          <Skeleton variant="rectangular" height={100} />
        </Box>
          )}
    </>
  )
}

import React, { useEffect, useMemo, useState } from 'react'
import { Box, MenuItem, TextField } from '@mui/material'
import { useContractCtx } from 'contexts/contract';
import { ContractMethod } from './method';
import { addressValidator } from 'helpers/validators';
import { ContractConfig } from './config';
import { useBaseAbiCoder, useWeb3 } from 'contexts/web3';

export const Contract: React.FC = () => {
  const ctx = useContractCtx();
  const abiCoder = useBaseAbiCoder();

  const { artifact } = ctx;
  const methods = artifact?.abi.filter((item) => item.type !== 'event');

  return (
    <>
      <Box
        sx={{ mb: 6 }}
      >
        <ContractConfig />
      </Box>
      {methods && methods.map((item) => {
        const fullName = abiCoder.encodeFunctionSignature(item);
        return (
          <ContractMethod key={fullName} abi={item} />
        )
      })}
      </>
      )
}

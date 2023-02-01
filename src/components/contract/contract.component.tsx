import React from 'react'
import Box from '@mui/material/Box'

import { useContractCtx } from 'contexts/contract'
import { useBaseAbiCoder } from 'contexts/chain'

import { ContractConfig } from './config'
import { useArtifact } from 'hooks/use-artifact'
import { EmptyContract } from './empty-contract'
import assert from 'assert'
import { ArtifactApi } from 'components/artifact/api'

interface ICoreProps {
  address: string | undefined;
  artifactHash: string
}
const ContractCore: React.FC<ICoreProps> = ({ artifactHash, address }) => {
  const artifact = useArtifact(artifactHash);

  if (artifact.loading) {
    return <EmptyContract />
  }

  console.log('!', artifact)
  assert(artifact.isExist && !artifact.isCorrupted,);
  return <ArtifactApi abi={artifact.abi} address={address} />
}

export const Contract: React.FC = () => {
  const ctx = useContractCtx()
  const abiCoder = useBaseAbiCoder()

  return (
    <>
      <Box
        sx={{ mb: 6 }}
      >
        <ContractConfig />
      </Box>
      {ctx.artifactHash ? (
        <ContractCore address={ctx.address} artifactHash={ctx.artifactHash} />
      ) : (
        <EmptyContract />
      )}
    </>
  )
}

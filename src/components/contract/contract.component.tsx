import React from 'react'
import Box from '@mui/material/Box'

import { ContractCtxProvider, useContractCtx } from 'contexts/contract'

import { ContractConfig } from './config'
import { useArtifact } from 'hooks/use-artifact'
import { EmptyContract } from './empty-contract'
import assert from 'assert'
import { ArtifactApi } from 'components/artifact/api'
import { withCtx } from 'contexts/ctx-factory'
import { ContractToolbar } from './toolbar/contract.toolbar'

interface ICoreProps {
  address: string | undefined;
  artifactHash: string
}
const ContractCore: React.FC<ICoreProps> = ({ artifactHash, address }) => {
  const artifact = useArtifact(artifactHash);

  if (artifact.loading) {
    return <EmptyContract />
  }
  assert(artifact.isExist && !artifact.error, 'not exist or error');
  return <ArtifactApi abi={artifact.abi} address={address} />
}

export const Contract = withCtx(ContractCtxProvider, () => {
  const ctx = useContractCtx()

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
});

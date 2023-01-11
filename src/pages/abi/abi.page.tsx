import React from 'react'
import { Container } from '@mui/material'
import { ChainCtxProvider } from 'contexts/web3';
import { ContractCtxProvider } from 'contexts/contract';
import { Contract } from 'components/contract';
import { ArtifactCtxProvider } from 'contexts/artifact/artifact.context';
import { AbiManager } from 'components/abi-manager';

import { AbiPageAppBar } from './components/app-bar';

export const AbiPage: React.FC = () => {

  return (
    <ArtifactCtxProvider>
      <AbiPageAppBar />
      <AbiManager />
    </ArtifactCtxProvider>
  )
}

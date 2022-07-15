import React from 'react'
import { Container } from '@mui/material'
import { ChainCtxProvider } from 'contexts/web3';
import { AppBar } from 'components/app-bar';
import { ContractCtxProvider } from 'contexts/contract';
import { Contract } from 'components/contract';
import { ArtifactCtxProvider } from 'contexts/artifact/artifact.context';

export const MainPage: React.FC = () => {

  return (
    <ChainCtxProvider>
      <ArtifactCtxProvider>
        <ContractCtxProvider>
          <AppBar />
          <Container>
            <Contract />
          </Container>
        </ContractCtxProvider>
      </ArtifactCtxProvider>
    </ChainCtxProvider>
  )
}

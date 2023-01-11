import React from 'react'
import { Container } from '@mui/material'
import { ChainCtxProvider } from 'contexts/web3';
import { ContractCtxProvider } from 'contexts/contract';
import { Contract } from 'components/contract';
import { ArtifactCtxProvider } from 'contexts/artifact/artifact.context';
import { MainPageAppBar } from './components/app-bar';

export const MainPage: React.FC = () => {

  return (
    <ChainCtxProvider>
      <ArtifactCtxProvider>
        <ContractCtxProvider>
          <MainPageAppBar />
          <Container>
            <Contract />
          </Container>
        </ContractCtxProvider>
      </ArtifactCtxProvider>
    </ChainCtxProvider>
  )
}

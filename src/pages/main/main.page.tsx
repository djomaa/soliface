import React from 'react'
import Container from '@mui/material/Container'

import { Contract } from 'components/contract';
import { ChainCtxProvider } from 'contexts/web3';
import { MainPageAppBar } from './components/app-bar';
import { ContractCtxProvider } from 'contexts/contract';
import { ArtifactCtxProvider } from 'contexts/artifact';

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

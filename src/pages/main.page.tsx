import React from 'react'
import { Container } from '@mui/material'
import { ChainCtxProvider } from 'contexts/web3';
import { AppBar } from 'components/app-bar';
import { ContractCtxProvider } from 'contexts/contract';
import { Contract } from 'components/contract';
import { ArtifactCtxProvider } from 'contexts/artifact/artifact.context';
import AuthorizationWrap from 'container/AuthorizationWrap';

export const MainPage: React.FC = () => {

  return (
    <ChainCtxProvider>
      <AuthorizationWrap>
        <ArtifactCtxProvider>
          <ContractCtxProvider>
            <AppBar />
            <Container>
              <Contract />
            </Container>
          </ContractCtxProvider>
        </ArtifactCtxProvider>
      </AuthorizationWrap>
    </ChainCtxProvider>
  )
}

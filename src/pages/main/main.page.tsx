import React from 'react'

import Container from '@mui/material/Container'

import { Contract } from 'components/contract'
import { ChainCtxProvider } from 'contexts/chain'
import { ContractCtxProvider } from 'contexts/contract'

import { MainPageAppBar } from './components/app-bar'
import { useAppTitle } from 'hooks/use-app-title'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      <ContractCtxProvider>
        <MainPageAppBar />
        <Container>
          <Contract />
        </Container>
      </ContractCtxProvider>
    </ChainCtxProvider>
  )
}

import React from 'react'

import Container from '@mui/material/Container'

import { Contract } from 'components/contract'
import { ChainCtxProvider } from 'contexts/web3'
import { ContractCtxProvider } from 'contexts/contract'

import { MainPageAppBar } from './components/app-bar'

export const MainPage: React.FC = () => {
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

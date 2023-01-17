import React from 'react'
import Container from '@mui/material/Container'

import { ChainCtxProvider } from 'contexts/web3';
import { AppBar } from 'components/app-bar';
import { ChainManager } from 'components/chain-manager';

export const ChainManagerPage: React.FC = () => {

  return (
    <ChainCtxProvider>
      <AppBar />
      <Container>
        <ChainManager />
      </Container>
    </ChainCtxProvider>
  )
}

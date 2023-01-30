import React from 'react'
import Container from '@mui/material/Container'

import { ChainCtxProvider } from 'contexts/chain'
import { AppBar } from 'components/app-bar'
import { ChainManager } from 'components/chain-manager'
import { useRouteTitle } from 'hooks/use-route-title'
import { Route } from 'constants/route'

export const ChainManagerPage: React.FC = () => {
  useRouteTitle(Route.ChainManager);
  return (
    <ChainCtxProvider>
      <AppBar />
      <Container>
        <ChainManager />
      </Container>
    </ChainCtxProvider>
  )
}

import React from 'react'

import { Route } from 'constants/route'
import { AppBar } from 'components/app-bar'
import { ChainCtxProvider } from 'contexts/chain'
import { useRouteTitle } from 'hooks/use-route-title'
import { ChainManager } from 'components/chain-manager'
import { PageContainer } from 'components/page-container'

export const ChainManagerPage: React.FC = () => {
  useRouteTitle(Route.ChainManager);
  return (
    <ChainCtxProvider>
      <AppBar />
      <PageContainer>
        <ChainManager />
      </PageContainer>
    </ChainCtxProvider>
  )
}

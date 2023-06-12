import React from 'react'

import { Route } from 'constants/route'
import { ChainCtxProvider } from 'contexts/chain'
import { useRouteTitle } from 'hooks/use-route-title'
import { ChainManager } from 'components/chain-manager'

export const ChainManagerPage: React.FC = () => {
  useRouteTitle(Route.ChainManager);
  return (
    <ChainCtxProvider>
      <ChainManager />
    </ChainCtxProvider>
  )
}

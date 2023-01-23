import React from 'react'

import { AbiManager } from 'components/abi-manager'

import { AbiManagerPageAppBar } from './components/app-bar'
import { useRouteTitle } from 'hooks/use-route-title'
import { Route } from 'constants/route'

export const AbiManagerPage: React.FC = () => {
  useRouteTitle(Route.AbiManager);
  return (
    <>
      <AbiManagerPageAppBar />
      <AbiManager />
    </>
  )
}

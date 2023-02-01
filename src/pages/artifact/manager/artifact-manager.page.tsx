import React from 'react'


import { Route } from 'constants/route'
import { AppBar } from 'components/app-bar'
import { useRouteTitle } from 'hooks/use-route-title'
import { ArtifactManager } from 'components/artifact/manager'

export const ArtifactManagerPage: React.FC = () => {
  useRouteTitle(Route.ArtifactManager);
  return (
    <>
      <AppBar />
      <ArtifactManager />
    </>
  )
}

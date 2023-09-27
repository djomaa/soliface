import React from 'react'
import { useNavigate } from 'react-router-dom'

import { Route } from 'constants/route'
import { AddAbi } from 'components/artifact/create'
import { useRouteTitle } from 'hooks/use-route-title'

export const CreateArtifactPage: React.FC = () => {
  const navigate = useNavigate();

  useRouteTitle(Route.CreateArtifact);
  return (
    <>
      <AddAbi onClose={() => {
        navigate(Route.ArtifactManager)
      }} />
    </>
  )
}

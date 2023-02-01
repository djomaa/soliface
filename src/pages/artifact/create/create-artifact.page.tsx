import React from 'react'
import { useNavigate } from 'react-router-dom'

import Container from '@mui/material/Container'

import { Route } from 'constants/route'
import { AppBar } from 'components/app-bar'
import { AddAbi } from 'components/artifact/create'
import { useRouteTitle } from 'hooks/use-route-title'

export const CreateArtifactPage: React.FC = () => {
  const navigate = useNavigate();

  useRouteTitle(Route.CreateArtifact);
  return (
    <>
      <AppBar />
      <Container>
        <AddAbi onClose={() => {
          console.log('NAVIGATE');
          navigate(Route.ArtifactManager)
        }} />
      </Container>
    </>
  )
}

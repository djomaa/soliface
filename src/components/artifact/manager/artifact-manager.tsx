import React from 'react'

import Container from '@mui/system/Container'
import Typography from '@mui/material/Typography'

import { ArtifactList } from './list/artifact-list'

export const ArtifactManager: React.FC = () => {
  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        ABI Manager
      </Typography>
      <ArtifactList />
    </Container>
  )
}

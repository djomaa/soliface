import React from 'react'

import Typography from '@mui/material/Typography'

import { ArtifactList } from './list/artifact-list'

export const ArtifactManager: React.FC = () => {
  return (
    <>
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
    </>
  )
}

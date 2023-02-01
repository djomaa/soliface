import React from 'react'

import Stack from '@mui/system/Stack';
import Typography from '@mui/material/Typography';

import { CreateArtifactStep, useCreateAbiCtx } from './ctx';

const DoneStepCore: React.FC = () => {
  return (
    <Stack direction='row' justifyContent='center'>
      <Typography variant='h2'>
        Done!
      </Typography>
    </Stack>
  )
}

export const DoneStep: React.FC = () => {
  const ctx = useCreateAbiCtx();
  if (ctx.step !== CreateArtifactStep.Done) {
    return <></>
  }
  return <DoneStepCore />
}

import React from 'react'

import Stack from '@mui/system/Stack';
import Typography from '@mui/material/Typography';

import { AddAbiStep, useAddAbiCtx } from './ctx';

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
  const ctx = useAddAbiCtx();
  if (ctx.step !== AddAbiStep.Done) {
    return <></>
  }
  return <DoneStepCore />
}

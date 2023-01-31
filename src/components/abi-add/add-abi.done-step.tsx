import React from 'react'

import { AddAbiStep, useAddAbiCtx } from './ctx';
import { Typography } from '@mui/material';
import Stack from '@mui/system/Stack';

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

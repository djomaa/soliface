
import LoadingButton from '@mui/lab/LoadingButton'
import { ButtonGroup } from '@mui/material';
import Stack from '@mui/system/Stack';
import React from 'react'
import { Child } from '../child';
import { ExtraActions } from './extra-actions';

export const Actions: React.FC = (props) => {

  return (
    <Child x y>
      <Stack direction='row'>
        <ButtonGroup variant='outlined'>
          <LoadingButton
            variant='outlined'
            sx={{
              xs: { width: '100%' },
              borderRadius: '0px',
            }}
            {...props}
          >
            Call
          </LoadingButton>
          <LoadingButton
            variant='outlined'
            sx={{
              borderRadius: '0px',
            }}
            {...props}
          >
            Write
          </LoadingButton>
        </ButtonGroup>
        <ExtraActions />
      </Stack>
    </Child>
  )
}

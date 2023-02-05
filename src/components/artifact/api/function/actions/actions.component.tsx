
import { ButtonGroup } from '@mui/material';
import Stack from '@mui/system/Stack';
import React from 'react'
import { Child } from '../child';
import { useCallHandler } from './call';
import { ExtraActions } from './extra-actions';
import { Handler } from './handler';
import { useWriteHandler } from './write';

export const Actions: React.FC = (props) => {

  const { callHandler } = useCallHandler();
  const { writeHandler } = useWriteHandler()

  return (
    <Child x y>
      <Stack direction='row'>
        <ButtonGroup variant='outlined'>
          {/* <LoadingButton
            variant='outlined'
            sx={{
              xs: { width: '100%' },
              borderRadius: '0px',
            }}
            {...props}
          >
            Call
          </LoadingButton> */}
          <Handler {...callHandler} />
          <Handler {...writeHandler} />
          {/* <LoadingButton
            variant='outlined'
            sx={{
              borderRadius: '0px',
            }}
            {...props}
          >
            Write
          </LoadingButton> */}
        </ButtonGroup>
        <ExtraActions />
      </Stack>
    </Child>
  )
}

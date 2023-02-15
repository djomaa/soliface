import React from 'react'

import Stack from '@mui/system/Stack';
import ButtonGroup from '@mui/material/ButtonGroup';

import { Child } from 'components/child';

import { Handler } from './handler';
import { useCallHandler } from './call';
import { useWriteHandler } from './write';
import { ExtraActions } from './extra-actions';

export const Actions: React.FC = (props) => {

  const { callHandler } = useCallHandler();
  const { writeHandler } = useWriteHandler()

  return (
    <Child x y>
      <Stack direction='row'>
        <ButtonGroup variant='outlined'>
          <Handler {...callHandler} />
          <Handler {...writeHandler} />
        </ButtonGroup>
        <ExtraActions />
      </Stack>
    </Child>
  )
}

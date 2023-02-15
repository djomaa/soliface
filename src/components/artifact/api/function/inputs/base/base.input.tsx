import React from 'react'

import Box from '@mui/material/Box'

import { InputPath, InputPosition } from '../input.component'
import { useInput } from './use-input'
import { ReactKeyedElement } from 'types/react';

export interface IBaseProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
  startAdornments?: ReactKeyedElement[];
  endAdornments?: ReactKeyedElement[];
}

export const BaseInput: React.FC<IBaseProps> = (props) => {
  const input = useInput(props);

  return (
    <Box pt={1}>
      {input}
    </Box >
  )
}

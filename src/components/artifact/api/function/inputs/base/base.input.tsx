import React from 'react'

import Box from '@mui/material/Box'

import { InputPath, InputPosition } from '../input.component'
import { useInput } from './use-input'

export interface IBaseProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
  startAdornment?: React.ReactNode;
}


// export const MethodInput: React.FC<IBaseProps> = ({ type, position, path, ...props }) => {
export const MethodInput: React.FC<IBaseProps> = (props) => {
  const input = useInput(props);

  return (
    <Box pt={1}>
      {input}
    </Box >
  )
}

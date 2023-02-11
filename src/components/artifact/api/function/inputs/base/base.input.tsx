import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'

import { Path } from '../components/path'
import { InputPath, InputPosition } from '../input.component'

export interface IBaseProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
  startAdornment?: React.ReactNode;
}
export const MethodInput: React.FC<IBaseProps> = ({ type, position, path, ...props }) => {
  const label = React.useMemo(() => {
    return (
      <Paper
        elevation={0}
      >
        <Path path={path} />
      </Paper>
    )
  }, [path])

  return (
    <Box pt={1}>
      <TextFieldElement
        name={position.join('.')}
        fullWidth
        variant='outlined'
        label={label}
        margin='dense'
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          startAdornment: props.startAdornment ? <InputAdornment position="start">{props.startAdornment}</InputAdornment> : undefined,
          endAdornment: <InputAdornment position="end">{type}</InputAdornment>,
        }}
      />
    </Box >
  )
}

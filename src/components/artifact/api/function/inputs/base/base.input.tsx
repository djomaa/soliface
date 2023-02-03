import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import Paper from '@mui/material/Paper'
import InputAdornment from '@mui/material/InputAdornment'

import { Path } from '../components/path'
import { InputPath, InputPosition } from '../input.component'

interface IProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
}
export const MethodInput: React.FC<IProps> = ({ type, position, path }) => {
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
          endAdornment: <InputAdornment position="end">{type}</InputAdornment>,
        }}
      />
    </Box >
  )
}

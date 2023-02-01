import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import { PathBreadcrump } from 'components/path-breadcrump'

import style from './base-input.module.scss'
import { InputPath, InputPosition } from '../input.component'

export interface iInputProps {
  name: string
  type: string
  position: InputPosition[]
  path: InputPath[]
  defaultValue?: string
}
export const MethodInput: React.FC<iInputProps> = ({ name, type, position, path, defaultValue }) => {
  const fullPosition = position.join('.')

  return (
    // <Box className={style.methodInput}>
    <Box className={style.MethodInput}>
      <Box className={style.MethodInputHeader}>
        <PathBreadcrump path={path} />
      </Box>
      <TextFieldElement
        fullWidth
        variant='outlined'
        // margin='dense'
        value={defaultValue}
        key={name}
        name={fullPosition}
        // label={name}
        InputProps={{
          startAdornment: <InputAdornment position="start" >{position.join(',')}</InputAdornment>,
          endAdornment: <InputAdornment position="end">{type}</InputAdornment>
        }}
      />
    </Box >
  )
}

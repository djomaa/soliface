import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import { PathBreadcrump } from 'components/path-breadcrump'

import style from './base-input.module.scss'
import { InputPath, InputPosition } from '../input.component'

interface IProps<T = {}> {
  type: string;
  position: InputPosition[]
  path: InputPath[]
}
export const MethodInput: React.FC<IProps> = ({ type, position, path }) => {
  const fullPosition = position.join('.')

  return (
    <Box className={style.MethodInput}>
      <Box className={style.MethodInputHeader}>
        <PathBreadcrump path={path} />
      </Box>
      <TextFieldElement
        name={fullPosition}
        fullWidth
        variant='outlined'
        label={path[path.length - 1]}
        InputProps={{
          startAdornment: <InputAdornment position="start" >{position.join(',')}</InputAdornment>,
          endAdornment: <InputAdornment position="end">{type}</InputAdornment>,
        }}
      />
    </Box >
  )
}

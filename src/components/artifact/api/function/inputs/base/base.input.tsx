import React from 'react'
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'

import { PathBreadcrump } from 'components/path-breadcrump'

import style from './base-input.module.scss'
import { InputPath, InputPosition } from '../input.component'

interface IProps<T = {}> {
  name: string
  type: string | undefined
  position: InputPosition[]
  path: InputPath[]
  props?: Omit<TextFieldElementProps<T>, 'name'>;
}
export const MethodInput: React.FC<IProps> = ({ name, type, position, path, props }) => {
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
        key={name}
        label={path[path.length - 1]}
        helperText
        InputProps={{
          // startAdornment: <InputAdornment position="start" >{position.join(',')}</InputAdornment>,
          endAdornment: type ? <InputAdornment position="end">{type}</InputAdornment> : undefined,
        }}
      />
    </Box >
  )
}

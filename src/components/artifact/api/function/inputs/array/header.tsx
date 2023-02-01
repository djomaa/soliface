import React from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { PathBreadcrump } from 'components/path-breadcrump'

import style from './array-input.module.scss'
import { InputPath } from '../input.component'

export interface IProps {
  type: string
  path: InputPath[]
}

export const ArrayInputHeader: React.FC<IProps> = ({ type, path }) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      className={style.MethodArrayInputHeader}
    >
      <PathBreadcrump
        path={path}
        typography={{ variant: 'subtitle2', color: 'text.primary' }}
      />
      <Typography
        variant='subtitle2'
        color='text.secondary'
      >
        {type}
      </Typography>
    </Stack>
  )
}

import React from 'react'

import Stack from '@mui/material/Stack'
import Typography from '@mui/material/Typography'

import { PathBreadcrump } from 'components/path-breadcrump'

import { InputPath } from '../input.component'
import style from './struct-input.module.scss'

export interface IProps {
  type: string
  path: InputPath[]
}

export const MethodStructInputHeader: React.FC<IProps> = ({ type, path }) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      className={style.MethodStructInputHeader}
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

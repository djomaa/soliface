import React from 'react';
import { Stack, Typography } from '@mui/material';

import styles from 'styles/common.module.scss'

import { PathBreadcrump } from '../path-breadcrump';

export interface IProps {
  type: string;
  path: string[];
}


export const ArrayInputHeader: React.FC<IProps> = ({ type, path, }) => {
  return (
    <Stack
      direction='row'
      justifyContent='space-between'
      alignItems='center'
      className={styles.ArrayInputHeader}
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

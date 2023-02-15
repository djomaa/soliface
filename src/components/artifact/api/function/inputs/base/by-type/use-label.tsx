import Paper from '@mui/material/Paper';
import React from 'react';
import { Path } from '../../components/path';

import { IDefaultProps } from '../use-input';

export const useLabel = (
  path: IDefaultProps['path'],
) => {
  return (
    <Paper
      elevation={0}
    >
      <Path path={path} />
    </Paper>
  )
}

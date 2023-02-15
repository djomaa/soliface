import Paper from '@mui/material/Paper';
import React from 'react';
import { Path } from './path';

import { IDefaultProps } from '../base/base-input';

interface IProps {
  path: IDefaultProps['path'],
}
export const Label: React.FC<IProps> = ({ path }) => {
  return (
    <Paper
      elevation={0}
    >
      <Path path={path} />
    </Paper>
  )
}

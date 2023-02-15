import Paper from '@mui/material/Paper';
import React from 'react';
import { Path } from './path';

import { IDefaultProps } from '../primitive/primitive-input';
import { AbiInput } from 'types/abi';

interface IProps {
  path: IDefaultProps['path'],
  type: AbiInput['type'];
}
export const Label: React.FC<IProps> = ({ path, type }) => {
  return (
    <Paper
      elevation={0}
    >
      <Path path={path} />
      - {type}
    </Paper>
  )
}

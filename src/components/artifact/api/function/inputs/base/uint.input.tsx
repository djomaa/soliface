import { TextField } from '@mui/material';
import React from 'react';
import { IBaseProps } from './base.input';

interface IProps extends IBaseProps {
  size: number;
}
export const UintInput: React.FC<IProps> = ({ size }) => {
  return (
    <TextField

    />
  )
}

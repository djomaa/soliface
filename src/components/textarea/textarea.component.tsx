import TextField, { TextFieldProps } from '@mui/material/TextField'
import { deepmerge } from '@mui/utils';
import React from 'react';

interface IProps {
  minHeight?: number | string;
}
export const TextArea: React.FC<TextFieldProps & IProps> = ({ minHeight, ...props }) => {
  if (minHeight !== undefined) {
    const inputProps = {
      style: {
        minHeight,
      }
    };
    props.inputProps = props.inputProps ? deepmerge(props.inputProps, inputProps) : inputProps;
  }
  return (
    <TextField
      {...props}
    />
  )

}


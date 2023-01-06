import React from 'react';
import { InputAdornment } from '@mui/material';
import { TextFieldElement } from 'react-hook-form-mui';

export interface iInputProps {
  name: string;
  type: string;
  /**
   * path to postion in final web3 array
   */
  position: (string | number)[];
  path: (string | number)[];
  defaultValue?: string;
}
export const MethodInput: React.FC<iInputProps> = ({ name, type, position, path, defaultValue }) => {
  const fullPosition = position.join('.');
  return (
    <TextFieldElement
      fullWidth
      variant='outlined'
      margin='dense'
      value={defaultValue}
      key={name}
      name={fullPosition}
      label={name}
      InputProps={{
        startAdornment: < InputAdornment position="start" >{position.join(',')}</InputAdornment>,
        endAdornment: < InputAdornment position="end">{type}</InputAdornment>
      }}
    />
  )
}

import { InputAdornment, Typography } from '@mui/material';
import React from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { AbiInput, AbiItem } from 'types/abi';
import { MethodArrayInput } from './array-input';

export interface iInputProps {
  name: string;
  type: string;
  /**
   * path to postion in final web3 array
   */
  position: number[];
  path: (string | number)[];
  defaultValue?: string;
}
export const MethodInput: React.FC<iInputProps> = ({ name, type, position, path, defaultValue }) => {
  const fullPosition = position.join('.');
  const fullPath = path.join('.');
  return (
    // <div>
    // {/* <Typography>{label}</Typography> */}
    <TextFieldElement
      fullWidth
      variant='standard'
      // variant='outlined'
      // margin='none'
      value={defaultValue}
      key={name}
      // name={fullPosition}
      name={fullPosition}
      // label={type}
      // label={name}
      label={fullPath}
      InputProps={{
        startAdornment: < InputAdornment position="start" >{position.join(',')}</InputAdornment>,
        endAdornment: < InputAdornment position="end">{type}</InputAdornment>
      }}
    />
    // </div>
  )
}

import React from 'react';

import Chip from '@mui/material/Chip';
import { TextFieldProps } from '@mui/material/TextField';

import { IBaseProps } from './base.input';
import { DefaultInput } from './by-type/default.input';
import { UintInput, UintInputRE } from './by-type/uint'

export interface IDefaultProps extends IBaseProps {
  fieldProps: TextFieldProps;
}

export const useInput = (props: IBaseProps) => {

  const defaults: IDefaultProps = {
    type: props.type,
    position: props.position,
    path: props.path,
    startAdornments: props.startAdornments,
    endAdornments: [
      ...props.endAdornments ?? [],
      <Chip key='type' label={props.type} />
    ],
    fieldProps: {
      fullWidth: true,
      margin: 'dense',
      variant: 'outlined',
      InputLabelProps: {
        shrink: true,
      }
    }
  }

  if (UintInputRE.test(props.type)) {
    const match = UintInputRE.exec(props.type);
    const size = match![1] ? Number(match![1]) : undefined;
    return <UintInput size={size} {...defaults} />
  }

  return <DefaultInput {...defaults} />

}

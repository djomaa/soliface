import React from 'react';

import { TextFieldProps } from '@mui/material/TextField';

import { ReactKeyedElement } from 'types/react';

import { HexInput } from './hex/hex.input';
import { PathAndLabelProps } from '../types';
import { UintInput, UintInputRE } from './uint'
import { Label } from '../components/label';
import { PartialRequired } from 'types/common';

export interface IBaseProps extends PathAndLabelProps {
  type: string;
  startAdornments?: ReactKeyedElement[];
  endAdornments?: ReactKeyedElement[];
}

export interface IDefaultProps extends IBaseProps {
  fieldProps: TextFieldProps & PartialRequired<TextFieldProps, 'name' | 'label'>;
}

export const PrimitiveInput: React.FC<IBaseProps> = (props) => {

  const defaults: IDefaultProps = {
    type: props.type,
    labels: props.labels,
    path: props.path,
    startAdornments: props.startAdornments,
    endAdornments: props.endAdornments,
    fieldProps: {
      label: <Label path={props.path} type={props.type} />,
      name: props.labels.join('.'),
      fullWidth: true,
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

  return <HexInput {...defaults} />

}

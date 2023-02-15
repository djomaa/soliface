import React from 'react';

import Chip from '@mui/material/Chip';
import { TextFieldProps } from '@mui/material/TextField';

import { ReactKeyedElement } from 'types/react';

import { HexInput } from '../hex/hex.input';
import { UintInput, UintInputRE } from '../uint'
import { InputPath, InputPosition } from '../input.component';

export interface IBaseProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
  startAdornments?: ReactKeyedElement[];
  endAdornments?: ReactKeyedElement[];
}

export interface IDefaultProps extends IBaseProps {
  fieldProps: TextFieldProps;
}

export const BaseInput: React.FC<IBaseProps> = (props) => {

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
      // margin: 'dense',
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

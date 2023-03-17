import React, { useEffect, useRef } from 'react';

import { TextFieldProps } from '@mui/material/TextField';

import { ReactKeyedElement } from 'types/react';

import { HexInput } from './hex/hex.input';
import { PathAndLabelProps } from '../types';
import { UintInput, UintInputRE } from './uint'
import { PartialRequired } from 'types/common';
import { useAbiInputsCtx } from 'components/abi-inputs';
import Box from '@mui/material/Box';
import { Typography } from '@mui/material';
import { Path } from '../components/path';

export interface IBaseProps extends PathAndLabelProps {
  type: string;
  startAdornments?: ReactKeyedElement[];
  endAdornments?: ReactKeyedElement[];
}

export interface IDefaultProps extends IBaseProps {
  fieldProps: TextFieldProps & PartialRequired<TextFieldProps, 'name'>;
}

interface ICoreProps extends IBaseProps {
  ref: React.RefObject<HTMLElement>
}

export const PrimitiveInputCore: React.FC<ICoreProps> = (props) => {


  const defaults: IDefaultProps = {
    type: props.type,
    labels: props.labels,
    path: props.path,
    startAdornments: props.startAdornments,
    endAdornments: props.endAdornments,
    fieldProps: {
      inputRef: props.ref,
      // label: <Label path={props.path} type={props.type} />,
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

export const PrimitiveInput: React.FC<IBaseProps> = (props) => {
  const { register } = useAbiInputsCtx();
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    register(props.labels, labelRef, inputRef)
  }, [])
  return (
    <Box
      ref={labelRef}
      sx={{
        padding: '0.5rem',
        ':hover': {
          backgroundColor: '#fafafa',
          // paddingTop: '0.5rem',
        }
      }}
    >
      <Typography variant='subtitle2'>
        <Path parts={props.labels} />
      </Typography>
      <Typography variant='overline' style={{ textTransform: 'unset' }}>
        {props.type}
      </Typography>
      <PrimitiveInputCore {...props} ref={inputRef} />
    </Box>
  )
}

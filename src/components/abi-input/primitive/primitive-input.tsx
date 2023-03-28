import React, { useEffect, useRef } from 'react';

import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { TextFieldProps } from '@mui/material/TextField';

import { PartialRequired } from 'types/common';
import { ReactKeyedElement } from 'types/react';
import { useAbiInputsCtx } from 'components/abi-inputs';

import { Path } from '../components/path';
import { HexInput } from './hex/hex.input';
import { PathAndLabelProps } from '../types';
import { UintInput, UintInputRE } from './uint'

export interface IBaseProps extends PathAndLabelProps {
  type: string;
  startAdornments?: ReactKeyedElement[];
  endAdornments?: ReactKeyedElement[];
}

export interface IDefaultProps extends IBaseProps {
  fieldProps: TextFieldProps & PartialRequired<TextFieldProps, 'name'>;
}

export const PrimitiveInputCore = React.forwardRef<HTMLElement, IBaseProps>((props, ref) => {

  const defaults: IDefaultProps = {
    type: props.type,
    labels: props.labels,
    path: props.path,
    startAdornments: props.startAdornments,
    endAdornments: props.endAdornments,
    fieldProps: {
      // inputRef: (...a: any[]) => console.log('set ref', a),
      inputRef: ref,
      name: props.path.join('.'),
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

});

export const PrimitiveInput: React.FC<IBaseProps> = (props) => {
  const ctx = useAbiInputsCtx.orEmpty();
  const labelRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    if (!ctx) {
      return;
    }
    ctx.register(props.labels, labelRef, inputRef);
    return () => {
      ctx.unregister(props.labels);
    }
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

import Chip from '@mui/material/Chip';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import React from 'react';
import { TextFieldElement, TextFieldElementProps } from 'react-hook-form-mui';
import { Path } from '../components/path';
import { IBaseProps } from './base.input';
import { UintInput, UintInputRE } from './uint.input'


export const useInput = (props: IBaseProps) => {
  const fieldProps = React.useMemo<TextFieldElementProps<any>>(() => {
    const label = (
      <Paper
        elevation={0}
      >
        <Path path={props.path} />
      </Paper>
    );
    return {
      label,
      fullWidth: true,
      margin: 'dense',
      variant: 'outlined',
      name: props.position.join('.'),
      InputLabelProps: {
        shrink: true,
      },
      InputProps: {
        startAdornment: props.startAdornment ? <InputAdornment position="start">{props.startAdornment}</InputAdornment> : undefined,
        endAdornment: <InputAdornment position="end"><Chip label={props.type} /></InputAdornment>,
      }
    }
  }, [props])


  if (UintInputRE.test(props.type)) {
    const match = UintInputRE.exec(props.type);
    const size = match![1] ? Number(match![1]) : undefined;
    return <UintInput size={size} fieldProps={fieldProps} />
  }

  return (
    <TextFieldElement
      {...fieldProps}
    />
  )

}

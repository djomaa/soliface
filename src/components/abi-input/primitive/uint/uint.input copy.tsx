import React, { useRef } from 'react';
import { Controller, ControllerProps, FieldValues, useWatch } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { useLogger } from 'hooks/use-logger';
import { applyDecimals, removeDecimals } from 'utils/decimals';

import { DecimalsChip } from './decimals-chip';
import { IDefaultProps } from '../primitive-input';
import { useAdornments } from '../../components/use-adornments';

interface ICoreProps<T extends FieldValues = FieldValues> extends IDefaultProps {
  form: Parameters<ControllerProps<T>['render']>[0];
  size?: number;
}

// TODO: fix when applyind decimals failed
const UintInputCore: React.FC<ICoreProps> = (props) => {
  const [Logger] = useLogger(UintInputCore, props.path);
  const [decimals, setDecimals] = React.useState<number>();
  const [value, setValue] = React.useState<string>(props.form.field.value);

  const wv = useWatch({ name: props.fieldProps.name });
  const ref = useRef(0);

  React.useEffect(() => {
    const logger = Logger.sub('useEffect(form.value');
    const receivedValue = String(wv);
    const newValue = decimals === undefined ? receivedValue : removeDecimals(receivedValue, decimals).toString();
    logger.debug('Value received', { value, ref: ref.current, received: receivedValue, receivedValueWithoutDecimals: newValue });
    if (newValue !== value) {
      logger.debug('Form value changed, local value updated');
      setValue(newValue);
    }
  }, [wv]);

  React.useEffect(() => {
    ref.current += 1;
    const logger = Logger.sub('useEffect(decimals, value)');
    const newValue = decimals === undefined || value === '' ? value : applyDecimals(value, decimals).toString();
    logger.debug('onChange', { value, ref: ref.current, decimals, newValue })
    props.form.field.onChange(newValue);
  }, [decimals, value]);

  const decimalsChip = <DecimalsChip key='decimals-chip' decimals={decimals} setDecimals={setDecimals} />;

  return (
    <TextField
      {...props.fieldProps}
      value={value ?? ''}
      onChange={(e) => setValue(e.target.value)}
      InputProps={{
        startAdornment: useAdornments('start', ...props.startAdornments ?? []),
        endAdornment: useAdornments('end', decimalsChip, ...props.endAdornments ?? [])
      }}
      error={!!props.form.fieldState.error}
      helperText={props.form.fieldState.error?.message}
    />
  )
}

interface IProps extends IDefaultProps {
  size?: number;
}

export const UintInput: React.FC<IProps> = (props) => {
  return (
    <Controller
      name={props.fieldProps.name}
      render={(formProps) => {
        return <UintInputCore form={formProps} {...props} />;
      }}
    />

  )
}

export const UintInputRE = /uint(\d*)/;

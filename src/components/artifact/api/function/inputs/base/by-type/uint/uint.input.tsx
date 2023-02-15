import { TextField } from '@mui/material';
import { useLogger } from 'hooks/use-logger';
import React, { useEffect } from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';
import { applyDecimals, removeDecimals } from 'utils/decimals';
import { IDefaultProps } from '../../use-input';
import { useAdornments } from '../use-adornments';
import { useLabel } from '../use-label';
import { DecimalsChip } from './decimals-chip';

interface ICoreProps<T extends FieldValues = FieldValues> extends IDefaultProps {
  form: Parameters<ControllerProps<T>['render']>[0];
  size?: number;
}

const UintInputCore: React.FC<ICoreProps> = (props) => {
  const [Logger] = useLogger(UintInputCore, props.path);
  const [decimals, setDecimals] = React.useState<number>();
  const [value, setValue] = React.useState<string>(props.form.field.value);

  useEffect(() => {
    const logger = Logger.sub('useEffect(form.value');
    const receivedValue = props.form.field.value;
    const newValue = decimals === undefined ? receivedValue : removeDecimals(receivedValue, decimals).toString();
    logger.debug('Value received', { current: value, received: receivedValue, receivedValueWithoutDecimals: newValue });
    if (newValue !== value) {
      logger.debug('Form value changed, local value updated');
      setValue(newValue);
    }
  }, [props.form.field]);

  useEffect(() => {
    const logger = Logger.sub('useEffect(decimals, value)');
    const newValue = decimals === undefined ? value : applyDecimals(value, decimals).toString();
    logger.debug('onChange', { value, decimals, newValue })
    props.form.field.onChange(newValue);
  }, [decimals, value]);

  const decimalsChip = <DecimalsChip key='decimals-chip' decimals={decimals} setDecimals={setDecimals} />;

  return (
    <TextField
      {...props.fieldProps}
      label={useLabel(props.path)}
      name={props.position.join('.')}
      value={value}
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
      name={props.position.join('.')}
      render={(formProps) => <UintInputCore form={formProps} {...props} />}
    />

  )
}

export const UintInputRE = /uint(\d*)/;

import React from 'react';
import { Controller, ControllerProps, FieldValues } from 'react-hook-form';

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

const UintInputCore: React.FC<ICoreProps> = (props) => {
  const [Logger] = useLogger(UintInputCore, props.path);
  const [decimals, setDecimals] = React.useState<number>();
  const [value, setValue] = React.useState<string>(props.form.field.value);

  React.useEffect(() => {
    const logger = Logger.sub('useEffect(form.value');
    const receivedValue = props.form.field.value;
    const newValue = decimals === undefined ? receivedValue : removeDecimals(receivedValue, decimals).toString();
    logger.debug('Value received', { current: value, received: receivedValue, receivedValueWithoutDecimals: newValue });
    if (newValue !== value) {
      logger.debug('Form value changed, local value updated');
      setValue(newValue);
    }
  }, [props.form.field]);

  React.useEffect(() => {
    const logger = Logger.sub('useEffect(decimals, value)');
    const newValue = decimals === undefined ? value : applyDecimals(value, decimals).toString();
    logger.debug('onChange', { value, decimals, newValue })
    props.form.field.onChange(newValue);
  }, [decimals, value]);

  const decimalsChip = <DecimalsChip key='decimals-chip' decimals={decimals} setDecimals={setDecimals} />;

  return (
    <TextField
      {...props.fieldProps}
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
      name={props.labels.join('.')}
      render={(formProps) => <UintInputCore form={formProps} {...props} />}
    />

  )
}

export const UintInputRE = /uint(\d*)/;

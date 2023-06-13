import React, { useRef } from 'react';
import { Controller, ControllerProps, FieldValues, useWatch } from 'react-hook-form';

import TextField from '@mui/material/TextField';

import { useLogger } from 'hooks/use-logger';
import { applyDecimals, removeDecimals } from 'utils/decimals';

import { DecimalsChip } from './decimals-chip';
import { IDefaultProps } from '../primitive-input';
import { useAdornments } from '../../components/use-adornments';
import { safe } from 'helpers/safe';

interface ICoreProps<T extends FieldValues = FieldValues> extends IDefaultProps {
  form: Parameters<ControllerProps<T>['render']>[0];
  size?: number;
}

// TODO: fix when applyind decimals failed
const UintInputCore: React.FC<ICoreProps> = (props) => {
  const [Logger] = useLogger(UintInputCore, props.path);
  const [decimals, setDecimals] = React.useState<number>();
  const [value, setValue] = React.useState<string>(props.form.field.value);
  const [decimalsError, setDecimalsError] = React.useState('');

  const formValue = useWatch({ name: props.fieldProps.name });
  const updated = useRef(false);

  React.useEffect(() => {
    const logger = Logger.sub('useEffect(form.value');
    logger.debug('Received', { value, formValue, ref: updated.current });
    try {
      if (updated.current) {
        logger.debug('Local change, do nothing');
        return;
      }
      const parsedValue = decimals === undefined ? formValue : removeDecimals(formValue, decimals).toString();
      setValue(parsedValue);
      logger.debug('Local value updated', parsedValue);
    } finally {
      updated.current = false;
    }
  }, [formValue]);

  const changeRemoteValue = React.useCallback((value: string) => {
    updated.current = true;
    const logger = Logger.sub('changeRemote');
    let parsedValue: string | undefined;
    if (value === '') {
      parsedValue = undefined;
    } else if (decimals) {
      const [error, valueWithDecimals] = safe(() => applyDecimals(value, decimals));
      if (error) {
        setDecimalsError('Failed to apply decimals, value was not changed');
        return false;
      }
      parsedValue = valueWithDecimals?.toString();
    } else {
      parsedValue = value;
    }
    logger.debug('Change', { value, parsedValue, decimals, formValue, updated: updated.current });
    props.form.field.onChange(parsedValue);
    return true;
  }, [decimals]);

  const onChange = React.useCallback((value: string) => {
    const changed = changeRemoteValue(value);
    if (changed) {
      setValue(value);
      updated.current = true;
    }
  }, [decimals]);

  React.useEffect(() => {
    changeRemoteValue(value);
  }, [decimals]);

  React.useEffect(() => {
    // @ts-ignore
    window.aaaa = props.form.field.onChange
  }, [props.form])

  const decimalsChip = <DecimalsChip key='decimals-chip' decimals={decimals} setDecimals={setDecimals} />;

  return (
    <TextField
      {...props.fieldProps}
      value={value ?? ''}
      onChange={(e) => onChange(e.target.value)}
      InputProps={{
        startAdornment: useAdornments('start', ...props.startAdornments ?? []),
        endAdornment: useAdornments('end', decimalsChip, ...props.endAdornments ?? [])
      }}
      error={!!decimalsError || !!props.form.fieldState.error}
      helperText={props.form.fieldState.error?.message || decimalsError}
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

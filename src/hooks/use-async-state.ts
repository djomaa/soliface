import assert from 'assert';
import React from 'react';
import { useLogger } from './use-logger';
import { useLoggerWithCounter } from './use-logger-with-counter';

export type AsyncStateCommon<V, E> = {
  setLoading(v: boolean): void;
  setValue(v: V | undefined): void;
  setError(v: E | undefined): void;
}
export type AsyncState<V, E> = {
  loading: false;
  error: undefined;
  value: V;

} | {
  loading: true;
  error: undefined;
  value: undefined;
} | {
  loading: false;
  error: E;
  value: undefined;
}

export const useAsyncState = <TValue, TError = string>() => {
  const logger = useLoggerWithCounter(useAsyncState);
  const [loading, setLoading] = React.useState<boolean>(true);
  const [error, setError] = React.useState<TError>();
  const [value, setValue] = React.useState<TValue>();

  const state = React.useMemo(() => {
    logger.debug('Update', {
      loading, error, value
    }, value && !loading && !error);
    if (value) { // ?
      assert(!loading && !error, 'Invalid state (non-empty value and empty loading & error)');
    }
    return {
      loading, setLoading,
      error, setError,
      value, setValue,
    } as AsyncState<TValue, TError> & AsyncStateCommon<TValue, TError>;
  }, [loading, error, value]);

  return state;
}

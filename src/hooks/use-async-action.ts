import { useCallback, useEffect, useMemo, useState } from 'react';
import { TypedFunction } from 'types/common';

export interface IAction<
  TResult extends any = any,
  TArgs extends any[] = any[],
> {
  loading: boolean;
  error: any;
  result: TResult | undefined,
  perform: (...params: TArgs) => void;
}

export const useAsyncAction = <
  TFn extends ((...args: any[]) => Promise<any>),
  TArgs extends Parameters<TFn>,
  TResult extends Awaited<ReturnType<TFn>>,
>(oAction: TFn, memo?: any[]): IAction<TResult, TArgs> => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState();
  const [result, setResult] = useState<TResult>();
  const action = memo ? useCallback(oAction, memo) : oAction;
  const perform = useCallback((...params: TArgs) => {
    setLoading(true);
    action(...params)
      .then((result) => {
        setError(undefined)
        setResult(result);
      })
      .catch((error) => {
        setError(error);
      })
      .finally(() => {
        setLoading(false);
      });
  }, [action]);

  return useMemo(() => {
    return { loading, error, result, perform };
  }, [loading, error, result, perform]);
};

import { useCallback, useEffect, useMemo, useState } from 'react';
import { TypedFunction } from 'types/common';
import { useLogger } from './use-logger';

interface iState<T = any> {
  id: number;
  loading: boolean;
  error: any;
  result: T | undefined;
}

// export interface IAction<
//   TResult extends any = any,
//   TArgs extends any[] = any[],
// > extends iState<TResult> {
//   perform: (...params: TArgs) => void;
// }

// export const useAsyncAction = <
//   TFn extends ((...args: any[]) => Promise<any>),
//   TArgs extends Parameters<TFn>,
//   TResult extends Awaited<ReturnType<TFn>>,
// >(oAction: TFn, memo?: any[]): IAction<TResult, TArgs> => {
//   const [logger] = useLogger(useAsyncAction);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState();
//   const [result, setResult] = useState<TResult>();
//   const action = memo ? useCallback(oAction, memo) : oAction;
//   const perform = useCallback((...params: TArgs) => {
//     logger.log('Started');
//     setLoading(true);
//     action(...params)
//       .then((result) => {
//         logger.log('Completed');
//         setError(undefined)
//         setResult(result);
//       })
//       .catch((error) => {
//         logger.log('Failed');
//         setError(error);
//       })
//       .finally(() => {
//         logger.log('Finished')
//         setLoading(false);
//       });
//   }, [action]);

//   return useMemo(() => {
//     return { loading, error, result, perform };
//   }, [loading, error, result, perform]);
// };

export type IAction<T> = iState<T>;

let id = 1;
export const useAsyncAction = <
  TFn extends ((...args: any[]) => Promise<any>),
  TArgs extends Parameters<TFn>,
  TResult extends Awaited<ReturnType<TFn>>,
>(oAction: TFn, memo?: any[]): [iState<TResult> | undefined, (...p: TArgs) => void] => {
  const [logger] = useLogger(useAsyncAction);
  const [state, setState] = useState<iState<TResult>>()
  const update = (update: Partial<iState<TResult>>) => {
    setState((prev) => {
      return {
        ...prev ?? { id: 0, loading: false, error: undefined, result: undefined },
        ...update,
      };
    })
  }
  const action = memo ? useCallback(oAction, memo) : oAction;
  const perform = useCallback((...params: TArgs) => {
    logger.log('Performing');
    update({ id, loading: true, error: undefined, result: undefined });
    id += 1;
    action(...params)
      .then((result) => {
        logger.log('Completed');
        update({ result, error: undefined });
      })
      .catch((error) => {
        logger.log('Failed');
        update({ error });
      })
      .finally(() => {
        logger.log('Finished');
        update({ loading: false });
      });
  }, [action]);

  return [state, perform]
};

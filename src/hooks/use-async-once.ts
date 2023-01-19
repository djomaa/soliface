import { useState } from 'react';
import { useAsyncFn } from 'react-use';
import { FunctionReturningPromise } from 'react-use/lib/misc/types';
import { AsyncFnReturn } from 'react-use/lib/useAsyncFn';

type UseAsyncOnceParams<T extends FunctionReturningPromise> = Parameters<typeof useAsyncFn<T>>;
export const useAsyncOnce = <T extends FunctionReturningPromise>(...params: UseAsyncOnceParams<T>) => {
  const [started, setStarted] = useState(false);
  const [state, execute] = useAsyncFn(...params);

  const start = () => {
    if (started) {
      throw new Error('asyncActionOnce already started');
    }
    setStarted(true);
    execute();
  }

  return [{
    ...state,
    started,
  }, start] as const;
}

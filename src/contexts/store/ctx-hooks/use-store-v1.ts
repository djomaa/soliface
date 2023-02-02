import { useCallback, useEffect, useMemo, useState } from 'react';
import { IHookStateResolvable } from 'react-use/lib/misc/hookState';

import { useLogger } from 'hooks/use-logger';

import { useStoreCtx } from './use-store-ctx'
import { StoreValue } from '../store.ctx-types';

let id = 0;
// TODO:! set loading on key change
// TODO: possive double render, when key changes. Fix:? set store[key] = obtain(key) on key change
// store[key] will be cleared on removeListener (but getState can be used not in useStore ctx, so seperate fn needed)
export const useStoreV1 = <T extends StoreValue>(key: string) => {
  const [Logger] = useLogger(useStoreV1, key, id++);
  const ctx = useStoreCtx();

  const [value, setState] = useState<T>();
  const [loading, setLoading] = useState(true);

  // const prevKey = usePrevious(key);
  // const value = useMemo(() => {
  //   if (prevKey === key) {
  //     return state;
  //   }
  //   return ctx.getState(key) as T | undefined;
  // }, [state, key]);

  const set = useCallback((value: IHookStateResolvable<T | undefined>) => {
    ctx.set(key, value);
  }, []);

  const remove = useCallback(() => {
    ctx.set(key, undefined);
  }, []);

  useEffect(() => {
    const value = ctx.getState(key) as T | undefined;
    setState(value);
    setLoading(false);
    const setter = (value: StoreValue | undefined) => {
      setState(value as T | undefined);
    }
    ctx.addListener(key, setter);
    return () => {
      ctx.removeListener(key, setter);
      setLoading(true);
    }
  }, [key]);

  return [loading, value, set, remove] as const;
}

useStoreV1.Object = <T extends StoreValue>(...args: Parameters<typeof useStoreV1>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [loading, value, set, remove] = useStoreV1<T>(...args);
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const result = useMemo(() => {
    return {
      loading,
      value,
      set,
      remove
    }
  }, [loading, value, set, remove]);
  return result;
}

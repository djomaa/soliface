import { usePrevious } from 'react-use';
import { useEffect, useMemo, useState } from 'react';
import { IHookStateResolvable } from 'react-use/lib/misc/hookState';

import { useLogger } from 'hooks/use-logger';

import { useStoreCtx } from './use-store-ctx'
import { StoreValue } from '../store.ctx-types';

let id = 0;
// TODO: possive double render, when key changes. Fix:? set store[key] = obtain(key) on key change
// store[key] will be cleared on removeListener (but getState can be used not in useStore ctx, so seperate fn needed)
export const useStore = <T extends StoreValue>(key: string) => {
  const [Logger] = useLogger(useStore, key, id++);
  const ctx = useStoreCtx();


  const [state, setState] = useState(() => {
    return ctx.getState(key) as T | undefined;
  });

  const prevKey = usePrevious(key);
  const value = useMemo(() => {
    if (prevKey === key) {
      return state;
    }
    return ctx.getState(key) as T | undefined;
  }, [state, key]);

  const set = (value: IHookStateResolvable<T | undefined>) => {
    ctx.set(key, value);
  }

  const remove = () => {
    ctx.set(key, undefined);
  }

  useEffect(() => {
    // setState(ctx.getState(key));
    setState(ctx.getState(key) as T | undefined);
    const setter = (value: StoreValue | undefined) => {
      setState(value as T | undefined);
    }
    ctx.addListener(key, setter);
    return () => {
      ctx.removeListener(key, setter);
    }
  }, [key]);

  return [value, set, remove] as const;
}

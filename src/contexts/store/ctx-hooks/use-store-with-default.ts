import { useEffect, useState } from 'react';
import { IHookStateSetAction } from 'react-use/lib/misc/hookState';

import { useKey } from 'hooks/use-key';
import { APP_NAME } from 'constants/storage';
import { useLogger } from 'hooks/use-logger';

import { useStore } from './use-store';
import { useStoreCtx } from './use-store-ctx';
import { StoreKey, StoreValue } from '../store.ctx';

let id = 0;
export const useStoreWithDefault = <T extends StoreValue>(keys: StoreKey[], initialValue: T) => {
  const key = useKey(APP_NAME, ...keys);
  const [Logger] = useLogger(useStore, key, id++);
  const ctx = useStoreCtx();

  const clone = () => structuredClone(initialValue);

  const [state, setState] = useState(() => {
    const original = ctx.getOriginalState(key) as T | undefined;
    return original ?? clone();
  });

  const set = (value: IHookStateSetAction<T>) => {
    ctx.set(key, value);
  }

  const reset = () => {
    ctx.set(key, clone())
  }

  useEffect(() => {
    ctx.addWatcher(key, setState);
    if (!ctx.getOriginalState(key)) {
      ctx.set(key, clone());
    }
    return () => {
      ctx.removeWatcher(key, setState);
    }
  }, []);


  return [state, set, reset, clone] as const;
}

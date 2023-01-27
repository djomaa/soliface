import { APP_NAME } from 'constants/storage';
import { useKey } from 'hooks/use-key';
import { useLogger } from 'hooks/use-logger';
import { useEffect, useState } from 'react';
import { IHookStateSetAction } from 'react-use/lib/misc/hookState';
import { StoreKey, StoreValue } from '../storage.ctx';
import { useStoreCtx } from './use-storage-ctx';
import { useStore } from './use-store';

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

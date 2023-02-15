import { usePrevious } from 'react-use';
import { SetStateAction, useEffect, useMemo, useState } from 'react';

import { useLogger } from 'hooks/use-logger';

import { useStore } from './use-store';
import { useStoreCtx } from './use-store-ctx';
import { StoreValue } from '../store.ctx-types';

let id = 0;
export const useStoreWithDefault = <T extends StoreValue>(key: string, initialValue: T) => {
  const [Logger] = useLogger(useStore, key, id++);
  const ctx = useStoreCtx();

  const clone = () => structuredClone(initialValue);

  const [state, setState] = useState(() => {
    // TODO:- thats copypaste
    const original = ctx.getState(key) as T | undefined;
    return original ?? clone();
  });

  const prevKey = usePrevious(key);
  const value = useMemo(() => {
    if (prevKey === key) {
      return state;
    }
    // TODO:- thats copypaste
    const original = ctx.getState(key) as T | undefined;
    return original ?? clone();
  }, [state, key]);

  const set = (value: SetStateAction<T>) => {
    ctx.set(key, value);
  }

  const reset = () => {
    ctx.set(key, clone())
  }

  useEffect(() => {
    const setter = (value: StoreValue | undefined) => {
      if (value === undefined) {
        ctx.set(key, clone());
      } else {
        setState(value as T);
      }
    }
    ctx.addListener(key, setter);
    if (!ctx.getState(key)) {
      ctx.set(key, clone());
    }
    return () => {
      ctx.removeListener(key, setter);
    }
  }, []);


  return [value, set, reset, clone] as const;
}

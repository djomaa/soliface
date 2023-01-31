import { useEffect, useState } from 'react';
import { IHookStateResolvable } from 'react-use/lib/misc/hookState';

import { useLogger } from 'hooks/use-logger';

import { StoreValue } from '../store.ctx';
import { useStoreCtx } from './use-store-ctx'

let id = 0;
export const useStore = <T extends StoreValue>(key: string) => {
  const [Logger] = useLogger(useStore, key, id++);
  const ctx = useStoreCtx();

  const [state, setState] = useState(() => {
    return ctx.getState(key) as T | undefined;
  });

  const set = (value: IHookStateResolvable<T | undefined>) => {
    ctx.set(key, value);
  }

  const remove = () => {
    ctx.set(key, undefined);
  }

  useEffect(() => {
    const setter = (value: StoreValue | undefined) => {
      setState(value as T | undefined);
    }
    ctx.addListener(key, setter);
    return () => {
      ctx.removeListener(key, setter);
    }
  }, []);

  return [state, set, remove] as const;
}

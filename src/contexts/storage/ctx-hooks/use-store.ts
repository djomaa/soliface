import { APP_NAME } from 'constants/storage';
import { useKey } from 'hooks/use-key';
import { useLogger } from 'hooks/use-logger';
import { useEffect, useState } from 'react';
import { IHookStateResolvable } from 'react-use/lib/misc/hookState';
import { StoreKey, StoreValue } from '../storage.ctx';
import { useStoreCtx } from './use-storage-ctx'

type SetCbPrev<T> = (handler: T | undefined) => T;

let id = 0;

type ISetState<T> = (prev: T) => T;

export const useStore = <T extends StoreValue>(keys: StoreKey[]) => {
  const key = useKey(APP_NAME, ...keys);
  const [Logger] = useLogger(useStore, key, id++);
  const ctx = useStoreCtx();

  const [state, setState] = useState(() => {
    return ctx.getOriginalState(key) as T | undefined;
  });

  const set = (value: IHookStateResolvable<T | undefined>) => {
    ctx.set(key, value);
  }

  const remove = () => {
    ctx.set(key, undefined);
  }

  useEffect(() => {
    ctx.addWatcher(key, setState);
    return () => {
      ctx.removeWatcher(key, setState);
    }
  }, []);

  return [state, set, remove] as const;
}

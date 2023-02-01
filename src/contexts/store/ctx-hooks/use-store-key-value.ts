import { SetStateAction, useCallback, useEffect, useState } from 'react';

import { useLogger } from 'hooks/use-logger';

import { StoreValue } from '../store.ctx-types';
import { useStoreCtx } from './use-store-ctx'

let id = 0;
export const useStoreKeyValue = <T extends StoreValue>(pattern: RegExp) => {
  const [Logger] = useLogger(useStoreKeyValue, pattern, id++);
  const ctx = useStoreCtx();

  const [state, setState] = useState(() => {
    // TODO: move this to ctx and create cache with key = pattern.toString()
    const result = new Map<string, T>();
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)!;
      const match = pattern.test(key);
      Logger.debug('initial', { key, pattern, match })
      if (!match) {
        continue;
      }
      const value = ctx.getState(key);
      result.set(key, value as T);
    }
    Logger.debug('initital result', result)
    return result;
  });

  const set = useCallback((key: string, value: SetStateAction<T | undefined>) => {
    ctx.set(key, value);
  }, []);


  useEffect(() => {
    const watcherId = ctx.addWatcher(pattern, (key, value) => {
      setState((prev) => {
        if (value === undefined) {
          // const result = prev.filter((item) => item === key);
          // return result;
          prev.delete(key);
          return new Map(prev);
        } else {
          prev.set(key, value as T)
          return new Map(prev);
        }
      })
    });
    return () => {
      ctx.removeWatcher(watcherId);
    }
  }, []);

  return [state, set] as const;
}

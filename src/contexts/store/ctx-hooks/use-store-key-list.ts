import { useEffect, useMemo, useState } from 'react';
import { IHookStateResolvable } from 'react-use/lib/misc/hookState';

import { useLogger } from 'hooks/use-logger';

import { StoreValue } from '../store.ctx';
import { useStoreCtx } from './use-store-ctx'

let id = 0;
export const useStoreKeyList = <T extends StoreValue>(pattern: RegExp) => {
  const [Logger] = useLogger(useStoreKeyList, pattern, id++);
  const ctx = useStoreCtx();

  const [state, setState] = useState(() => {
    const result: string[] = [];
    for (let i = 0; i < localStorage.length; i += 1) {
      const key = localStorage.key(i)!;
      const match = pattern.test(key);
      if (!match) {
        continue;
      }
      result.push(key);
    }
    return result;
  });

  const set = (value: IHookStateResolvable<T | undefined>) => {
    ctx.set(key, value);
  }

  const remove = () => {
    ctx.set(key, undefined);
  }

  const watcher = useMemo(() => {
    return { pattern, setState };
  }, [key]);

  useEffect(() => {
    const watcherId = ctx.addWatcher(pattern, (key, value) => {
      setState((prev) => {
        if (value === undefined) {
          const result = prev.filter((item) => item === key);
          return result;
        } else {
          return [...prev, key];
        }
      })
    });
    return () => {
      ctx.removeWatcher(id);
    }
  }, []);

  return [state, set, remove] as const;
}

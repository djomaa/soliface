import { useLogger } from 'hooks/use-logger';
import { useCallback, useContext, useEffect, useMemo } from 'react'
import { StorageCtx } from '../storage.ctx';

export const useStorage = <T extends object | string | undefined | null | number>(key: string, inititalState: T | (() => T)) => {
  const [Logger] = useLogger('useStorage', key);
  const ctx = useContext(StorageCtx);
  if (!ctx) {
    throw new Error('asdasdasd');
  }
  const value = useMemo<T>(() => {
    const value = ctx.store[key];
    if (value === undefined) {
      const initial = typeof inititalState === 'function' ? inititalState() as T : inititalState;
      Logger.debug('useMemo(value)', { initial });
      return initial;
    }
    Logger.debug('useMemo(value)', { value });
    return value;
  }, [key, ctx.store, inititalState]);

  const set = useCallback((setValue: T | ((prev: T | undefined) => T)) => {
    let finalValue: T | undefined;
    if (typeof setValue === 'function') {
      const prev = ctx.get<T | undefined>(key);
      finalValue = setValue(prev);
    } else {
      finalValue = setValue;
    }
    Logger.debug('set', { finalValue });
    return ctx.set(key, finalValue);
  }, [key, ctx])

  useEffect(() => {
    Logger.debug('useEffect', value);
    set(value);
  }, [])

  return [value, set] as const;
}


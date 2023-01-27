import { APP_NAME } from 'constants/storage';
import { useKey } from 'hooks/use-key';
import { useLogger } from 'hooks/use-logger';
import { useCallback, useMemo } from 'react';
import { useEffectOnce } from 'react-use'
import { StoreKey, StoreValue } from '../storage.ctx';
import { useStoreCtx } from './use-storage-ctx'

type SetCbPrev<T> = (handler: T | undefined) => T;

let id = 0;

export const useStore = <T extends StoreValue>(keys: StoreKey[]) => {
  const key = useKey(APP_NAME, ...keys);
  const [Logger] = useLogger(useStore, key, id++);

  const ctx = useStoreCtx();

  useEffectOnce(() => {
    ctx.watch(key);
    return () => {
      ctx.unwatch(key);
    }
  });

  const value = useMemo(() => {
    return ctx.store[key] as T;
  }, [ctx.store, key]);

  const set = useCallback((value: T | SetCbPrev<T>) => {
    const logger = Logger.sub('set');
    logger.debug('Start', { value });
    if (typeof value === 'function') {

      // const prev = ctx.get(key) as T;
      const prev = ctx.store[key] as T;
      logger.error('test', { a: ctx.get(key), b: ctx.store[key] });
      const finalValue = value(prev) as T;
      logger.debug('Set (using factory)', { value: finalValue, prev });
      ctx.set(key, finalValue);
    } else {
      logger.debug('Set', value);
      ctx.set(key, value);
    }
  }, [key, ctx.get, ctx.set]);

  const remove = useCallback(() => {
    ctx.set(key, undefined);
  }, [ctx.set, key])

  return [value, set, remove] as const;
}

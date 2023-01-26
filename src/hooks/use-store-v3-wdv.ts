import { APP_NAME } from 'constants/storage';
import { useCallback, useMemo } from 'react';
import { useKey } from './use-key';
import { useLogger } from './use-logger';
import { useStoreV3 } from './use-store-v3';

export function get<T>(key: string): T | undefined {
  const raw = localStorage.getItem(key)
  if (raw === null) {
    return undefined;
  }
  const decoded = JSON.parse(raw)
  return decoded;
}

function put<T>(key: string, value: T) {
  const encoded = JSON.stringify(value)
  localStorage.setItem(key, encoded)
}

function remove(key: string) {
  localStorage.removeItem(key);
}

type Aaa<T> = T | ((prev: T | undefined) => T);
type Qw = string | object;

let id = 0;
export const useStoreV3WDV = <T extends Qw>(keys: string[], DefaultValue: T) => {
  const key = useKey([APP_NAME, ...keys]);
  const [Logger] = useLogger('useStoreWD', key, id++);

  const cloneDefault = useCallback(() => {
    return structuredClone(DefaultValue);
  }, [DefaultValue]);
  const [oValue, oSet] = useStoreV3<T>(keys);

  const value = useMemo(() => {
    const logger = Logger.sub('useMemo(value)');
    if (oValue === undefined) {
      logger.debug('Reset to default');
      const defaultValue = cloneDefault();
      oSet(defaultValue);
      return defaultValue;
    }
    return oValue;
  }, [oValue, oSet, cloneDefault]);

  const set = useCallback((value: Aaa<T>) => {
    const logger = Logger.sub('set');
    if (typeof value !== 'function') {
      oSet(value);
      return;
    }
    oSet((prev) => {
      const finalValue = value(prev);
      if (finalValue === undefined) {
        logger.debug('Reset to default');
        return cloneDefault();
      }
      return finalValue;
    })
  }, [oSet, cloneDefault]);

  const clear = useCallback(() => {
    const logger = Logger.sub('clear');
    logger.debug('Reset to default');
    oSet(cloneDefault());
  }, [oSet, cloneDefault]);

  return [value, set, clear] as const;

}

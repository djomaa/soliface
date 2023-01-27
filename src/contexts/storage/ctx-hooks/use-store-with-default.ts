import { APP_NAME } from 'constants/storage';
import { useKey } from 'hooks/use-key';
import { useLogger } from 'hooks/use-logger';
import { useCallback, useEffect, useMemo } from 'react';
import { StoreKey, StoreValue } from '../storage.ctx';
import { useStore } from './use-store';

export const useStoreWithDefault = <T extends StoreValue>(keys: StoreKey[], initialValue: T) => {
  const key = useKey(APP_NAME, ...keys);
  const [Logger] = useLogger(useStoreWithDefault.name, key);

  const [oValue, oSet, oRemove] = useStore<T>(keys);

  const clone = useCallback(() => {
    return structuredClone(initialValue);
  }, [initialValue]);

  const value = useMemo(() => {
    return oValue === undefined ? clone() : oValue;
  }, [oValue, clone]);

  useEffect(() => {
    Logger.debug('useEffect');
    if (value === undefined) {
      oSet(clone());
    }
  }, [value, oSet, clone]);

  return [value, oSet, oRemove, clone] as const;
}

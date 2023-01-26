import { useCallback, useEffect, useState } from 'react';
import { useEventEmitter } from './use-event-emitter';
import { useKey } from './use-key';
import { useLogger } from './use-logger';

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

let id = 0;
export const useStoreV1 = <T>(keys: string[]) => {
  const key = useKey(keys);
  const [Logger] = useLogger('useStore', key, id++);

  const refresh = useCallback(() => {
    // takes value from the LC and setValue
    const value = get<T>(key);
    return value;
  }, [key]);

  const emit = useEventEmitter(key, () => {
    const value = refresh()
    Logger.debug('Refreshed', value);
    setValue(value);
  })

  const [value, setValue] = useState<T | undefined>(() => {
    const value = refresh();
    Logger.debug('Initial value', value);
    return value;
  });

  useEffect(() => {
    const logger = Logger.sub('useEffect[key, value]')
    logger.debug('Value changed', value);
    if (value === undefined) {
      logger.debug('Remove');
      remove(key);
    } else {
      logger.debug('Put');
      put(key, value);
    }
    emit();
  }, [key, value]);

  const clearValue = useCallback(() => {
    setValue(undefined);
  }, []);

  return [value, setValue, clearValue] as const;

}

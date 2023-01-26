import { APP_NAME } from 'constants/storage';
import { useStorage } from 'contexts/storage';
import { useCallback, useEffect } from 'react';
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

type Aaa<T> = T | ((prev: T | undefined) => T);

let id = 0;
export const useStoreV4 = <T extends string | object>(keys: string[]) => {
  const key = useKey([APP_NAME, ...keys]);
  const [Logger] = useLogger('useStore', key, id++);

  // const [store, setStore] = useStorage(key);

  const refresh = useCallback(() => {
    // takes value from the LC and setValue
    const value = get<T>(key);
    return value;
  }, [key]);

  // const emit = useEventEmitter(key, () => {
  //   const value = refresh()
  //   Logger.debug('Updated by event', value);
  //   setValue(value);
  // })

  const [value, setValue] = useStorage<T | undefined>(key, () => {
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
  }, [key, value]);

  const clear = useCallback(() => {
    Logger.debug('Remove');
    remove(key);
  }, [key]);

  return [value, setValue, clear] as const;

}

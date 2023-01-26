import { APP_NAME } from 'constants/storage';
import { useCallback, useState } from 'react';
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

type Aaa<T> = T | ((prev: T | undefined) => T);

let id = 0;
export const useStoreV2 = <T extends string | object>(keys: string[]) => {
  const key = useKey([APP_NAME, ...keys]);
  const [Logger] = useLogger('useStore', key, id++);

  const refresh = useCallback(() => {
    // takes value from the LC and setValue
    const value = get<T>(key);
    return value;
  }, [key]);

  const emit = useEventEmitter(key, () => {
    const value = refresh()
    Logger.debug('Updated by event', value);
    setValue(value);
  })

  const [value, setValue] = useState<T | undefined>(() => {
    const value = refresh();
    Logger.debug('Initial value', value);
    return value;
  });

  // useEffect(() => {
  //   const logger = Logger.sub('useEffect[key, value]')
  //   logger.debug('Value changed', value);
  //   if (value === undefined) {
  //     logger.debug('Remove');
  //     remove(key);
  //   } else {
  //     logger.debug('Put');
  //     put(key, value);
  //   }
  //   emit();
  // }, [key, value]);

  const setCb = useCallback((value: Aaa<T>, prev: T | undefined) => {
    const finalValue = typeof value === 'function' ? value(prev) as T : value;
    Logger.debug('Set cb', finalValue);
    put(key, finalValue);
    emit();
    return finalValue;
  }, [key, emit]);

  const set = useCallback((value: Aaa<T>) => {
    Logger.debug('Set', value);
    const e = new Error('aaa');
    console.error(e);
    setValue((prev) => setCb(value, prev));
  }, [setCb]);

  const clear = useCallback(() => {
    Logger.debug('Remove');
    remove(key);
    emit();
  }, [key, emit]);

  return [value, set, clear] as const;

}

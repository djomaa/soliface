import { SetStateAction, useCallback, useEffect, useMemo, useState } from 'react'

import { APP_NAME, createKey } from 'constants/storage'

import { useLogger } from './use-logger'
import { useEventEmitter } from './use-event-emitter'

function get<T>(key: string): T | undefined {
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

type AA<T, D = T | undefined> = D extends undefined ? T | undefined : NonNullable<D>;

type UseStoreReturn<T, D = T | undefined> = [
  value: AA<T, D>,
  set: (value: T) => void,
  clear: () => void,
]

let id = 0;
// TODO:- validation
export const useStore = <T, D = T | undefined>(keys: Array<string | number>, oDefaultValue?: D): UseStoreReturn<T, D> => {
  const key = useMemo(() => {
    return createKey(APP_NAME, ...keys)
  }, [keys])
  const [Logger, { logState }] = useLogger('useStore', id++, key)

  const defaultValue = useMemo(() => {
    if (!oDefaultValue) {
      return;
    }
    const clone = structuredClone(oDefaultValue);
    return clone;
  }, [oDefaultValue])

  const emit = useEventEmitter(key, () => {
    Logger.debug('Updated by event', key)
    const newValue = refresh(false);
    setValue(newValue);
  })

  const refresh = useCallback((doEmit: boolean) => {
    const logger = Logger.sub('init');
    const result = get<T>(key);
    logger.debug('value obtained', result);
    if (!result && defaultValue) {
      logger.debug('putting default');
      put(key, defaultValue);
      if (doEmit) {
        Logger.debug('emitting updated')
        emit();
      }
      return defaultValue as AA<T, D>;
    }
    logger.debug('returning', result);;
    return result as AA<T, D>;
  }, [key, defaultValue, emit]);

  const [value, setValue] = useState<D extends undefined ? T | undefined : NonNullable<D>>(() => {
    const result = refresh(true);
    return result;
  });


  // logState('value', value)

  const set = useCallback((newValue: T | SetStateAction<T>) => {
    Logger.debug('Set', { newValue, defaultValue })
    put(key, newValue);
    // setValue((prev) => typeof newValue)
    emit()
  }, [key, emit])

  const remove = useCallback(() => {
    Logger.debug('Remove')
    // if (defaultValue) {
    //   // put(key, defaultValue);
    //   setValue(defaultValue)
    // } else {
    //   setValue(undefined);
    // }
    emit()
  }, [key, emit]);

  useEffect(() => {
    if (value === undefined) {
      localStorage.removeItem(key);
      return;
    }
    put(key, value)
  }, [key, value])

  return [value, set, remove];
}

// useStore.object = (...params: Parameters<(typeof useStore)>) => {
//   // eslint-disable-next-line react-hooks/rules-of-hooks
//   const [value, set, remove] = useStore(...params)
//   return { value, set, remove }
// }

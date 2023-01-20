import { APP_NAME, createKey } from 'constants/storage';
import { useCallback, useMemo, useState } from 'react';
import { useEventEmitter } from './use-event-emitter';
import { useLogger } from './use-logger';

function getOriginal(key: string) {
  const raw = localStorage.getItem(key);
  if (raw === null) {
    return;
  }
  const decoded = JSON.parse(raw);
  return decoded;
}

let id = 0;
export const useStore = (keys: (string | number)[]) => {
  const key = useMemo(() => {
    return createKey(APP_NAME, ...keys);
  }, [keys]);

  const [Logger, { logState }] = useLogger(useStore.name, id++, key);

  const [value, setValue] = useState<string | undefined>(getOriginal(key));

  const emit = useEventEmitter(key, () => {
    Logger.debug('Updated by event', key);
    setValue(getOriginal(key));
  })

  logState('value', value)

  const set = useCallback((newValue: string) => {
    Logger.debug('Set', { newValue });
    const encoded = JSON.stringify(newValue);
    localStorage.setItem(key, encoded);
    setValue(newValue);
    emit();
  }, [key]);

  const remove = useCallback(() => {
    Logger.debug('Remove');
    localStorage.removeItem(key);
    emit();
  }, [key]);

  return [value, set, remove] as const;
}

useStore.object = (...params: Parameters<(typeof useStore)>) => {
  const [value, set, remove] = useStore(...params);
  return { value, set, remove };
}

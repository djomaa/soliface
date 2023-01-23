import { useCallback, useMemo, useState } from 'react'

import { APP_NAME, createKey } from 'constants/storage'

import { useLogger } from './use-logger'
import { useEventEmitter } from './use-event-emitter'

function obtain(key: string) {
  const raw = localStorage.getItem(key)
  if (raw === null) {
    return
  }
  const decoded = JSON.parse(raw)
  return decoded;
}


export const useStore = <T>(keys: Array<string | number>) => {
  const key = useMemo(() => {
    return createKey(APP_NAME, ...keys)
  }, [keys])

  const [Logger, { logState }] = useLogger(useStore.name, key)

  const [value, setValue] = useState<T | null>(() => obtain(key));

  const emit = useEventEmitter(key, () => {
    Logger.debug('Updated by event', key)
    const newValue = obtain(key);
    setValue(newValue)
  })

  logState('value', value)

  const set = useCallback((newValue: T) => {
    Logger.debug('Set', { newValue })
    const encoded = JSON.stringify(newValue)
    localStorage.setItem(key, encoded)
    setValue(newValue)
    emit()
  }, [key])

  const remove = useCallback(() => {
    Logger.debug('Remove')
    localStorage.removeItem(key)
    emit()
  }, [key])

  return [value, set, remove] as const
}

useStore.object = (...params: Parameters<(typeof useStore)>) => {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const [value, set, remove] = useStore(...params)
  return { value, set, remove }
}

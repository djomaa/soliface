import { startTransition, useCallback, useEffect, useMemo } from 'react'

import { EventEmitter } from 'utils/event-emitter'

const ee = new EventEmitter()

export const useEventEmitter = (key: string, oFn: Function) => {
  const fn = useMemo(() => {
    return () => startTransition(() => oFn())
  }, []);

  useEffect(() => {
    ee.on(key, fn)
    return () => {
      ee.off(key, fn)
    }
  }, [])

  const emit = useCallback(() => {
    ee.emit(key, fn)
  }, [key, fn]);

  return emit
}

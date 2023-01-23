import { useCallback, useEffect } from 'react'

import { EventEmitter } from 'utils/event-emitter'

const ee = new EventEmitter()

export const useEventEmitter = (key: string, fn: Function) => {
  useEffect(() => {
    ee.on(key, fn)
    fn()
    return () => {
      ee.off(key, fn)
    }
  })

  const emit = useCallback(() => {
    ee.emit(key, fn)
  }, [fn])
  return emit
}

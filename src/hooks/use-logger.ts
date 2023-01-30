import { useEffect, useMemo } from 'react'

import { Logger } from 'helpers/logger'

interface Stringifiable { toString: () => string }

// TODO: move to utils
export const useLogger = (keyOrFn: string | Function, ...subs: Stringifiable[]) => {
  return useMemo(() => {

    const firstPart = typeof keyOrFn === 'function' ? keyOrFn.name : keyOrFn;
    const logger = new Logger(firstPart, ...subs)

    const logState = (text: string, state: any) => {
      const subLogger = logger.sub(text)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        subLogger.debug(state)
      }, [state])
    }

    const utils = { logState }

    return [logger, utils] as const
  }, [])
}

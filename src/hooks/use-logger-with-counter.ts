import { useEffect, useMemo } from 'react'

import { Logger } from 'helpers/logger'

interface Stringifiable { toString: () => string }

// TODO: MEMORY LEAK RIGHT HERE 
const cache = new Map<string, number>();

// TODO: move to utils
export const useLoggerWithCounter = (keyOrFn: string | Function, ...subs: Stringifiable[]) => {
  return useMemo(() => {

    const firstPart = typeof keyOrFn === 'function' ? keyOrFn.name : keyOrFn;
    const key = [firstPart, ...subs].join(':');

    const counter = 1 + (cache.get(key) ?? 0);
    cache.set(key, counter);

    const logger = new Logger(firstPart, ...subs, counter)

    const logState = (text: string, state: any) => {
      const subLogger = logger.sub(text)
      // eslint-disable-next-line react-hooks/rules-of-hooks
      useEffect(() => {
        subLogger.debug(state)
      }, [state])
    }

    const utils = { logState }

    return logger;
  }, [keyOrFn, subs])
}

import { Logger } from 'helpers/logger'
import { useEffect, useMemo } from 'react'

type Stringifiable = { toString: () => string };

export const useLogger = (keyOrFn: string | Function, ...subs: Stringifiable[]) => {
  return useMemo(() => {
    const key = typeof keyOrFn === 'function' ? keyOrFn.name : keyOrFn;
    const prefix = [key, ...subs.map(s => s.toString())].join(':');
    const logger = new Logger(prefix);

    const logState = (text: string, state: any) => {
      const subLogger = logger.sub(text);
      useEffect(() => {
        subLogger.debug(state);
      }, [state]);
    }

    const utils = { logState };

    return [logger, utils] as const;
  }, []);
}

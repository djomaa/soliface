import { Logger } from 'helpers/logger'
import { useEffect, useMemo } from 'react'

export const useLogger = (keyOrFn: string | Function) => {
  return useMemo(() => {
    const prefix = typeof keyOrFn === 'function' ? keyOrFn.name : keyOrFn;
    const logger = new Logger(prefix);

    const logState = (text: string, state: any) => {
      const subLogger = logger.sub(text);
      useEffect(() => {
        subLogger.log(state);
      }, [state]);
    }

    const utils = { logState };

    return [logger, utils] as const;
  }, []);
}

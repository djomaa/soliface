import { createKey } from 'constants/storage';
import { useMemo } from 'react';

export const useKey = (...params: Parameters<typeof createKey>) => {
  return useMemo(() => {
    return createKey(...params);
  }, [params])
}

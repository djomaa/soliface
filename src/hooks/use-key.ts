import { createKey } from 'constants/storage';
import { useMemo } from 'react';

type Key = string | number;
export const useKey = (keys: Key[]) => {
  return useMemo(() => {
    return createKey(...keys);
  }, [keys])
}

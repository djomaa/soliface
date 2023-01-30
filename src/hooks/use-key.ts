import { createKey } from 'constants/storage';
import { useMemo } from 'react';

function generateKey(...params: Parameters<typeof createKey>) {
  return createKey(...params);
}

export const useKey = (...params: Parameters<typeof createKey>) => {
  return useMemo(() => generateKey(...params), [params])
}

useKey.Pure = generateKey;

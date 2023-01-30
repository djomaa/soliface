import { APP_NAME, createKey } from 'constants/storage';
import { useMemo } from 'react';

function pure(delemiter: string, ...params: Parameters<typeof createKey>) {
  return [APP_NAME, ...params].join(delemiter);
}

export const useKey = (delemiter: string, ...params: Parameters<typeof createKey>) => {
  return useMemo(() => pure(delemiter, ...params), [delemiter, params])
}

useKey.Pure = pure;

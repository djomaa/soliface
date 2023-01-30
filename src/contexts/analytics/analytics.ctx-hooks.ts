import { useAnalytics as useAnalyticsOriginal } from 'use-analytics';

import { NoCtxProviderError } from 'contexts/ctx-factory';

export const useAnalytics = () => {
  const original = useAnalyticsOriginal();
  if (!original) {
    throw new NoCtxProviderError('Analytics');
  }
  return original;
}

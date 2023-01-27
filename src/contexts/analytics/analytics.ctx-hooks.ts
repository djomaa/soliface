import { useAnalytics as useAnalyticsOriginal } from 'use-analytics';

export const useAnalytics = () => {
  const original = useAnalyticsOriginal();
  if (!original) {
    throw new Error('No analytics context found');
  }
  return original;
}

import { useCallback, useRef } from 'react';

export const useFocus = () => {
  const htmlElRef = useRef<HTMLElement>(null)
  const setFocus = useCallback((delayMs?: number) => {
    if (typeof delayMs !== 'number') {
      htmlElRef.current?.focus();
      return;
    }
    setTimeout(() => {
      htmlElRef.current?.focus();
    }, delayMs);
  }, []);

  return [htmlElRef, setFocus] as const;
}

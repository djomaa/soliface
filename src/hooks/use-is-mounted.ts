import React from 'react';

export const useIsMounted = () => {
  const ref = React.useRef(false)

  React.useEffect(() => {
    ref.current = true;
    return () => { ref.current = false }
  }, []);

  const isMounted = React.useCallback(() => {
    return ref.current;
  }, [ref]);

  return { isMounted };
}

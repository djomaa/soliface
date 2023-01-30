import React from 'react';
import { useMemo, useState } from 'react';

export const useModal = <T,>(Modal: React.FC<T>) => {
  const [props, setProps] = useState<T>();

  const element = useMemo(() => {
    return props ? <Modal {...props} /> : undefined;
  }, [props]);

  return [
    element,
    (props: T) => setProps(props),
  ] as const;
}

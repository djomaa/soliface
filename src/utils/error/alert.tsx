import React, { useMemo } from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// TODO: implement cause
export const ErrorAlert: React.FC<{ error: Error }> = ({ error }) => {
  const title = `${error.name}: ${error.message}`
  const stack = useMemo(() => {
    if (!error.stack) {
      return;
    }
    const stackOnly = error.stack.substring(title.length);
    return stackOnly
      .split('\n')
      .map((line, i) => {
        return <div>{line}</div>
      });
  }, [error]);
  return (
    <Alert severity='error'>
      <AlertTitle>{title}</AlertTitle>
      {stack}
    </Alert>
  )
}

export * from './unknown-alert';

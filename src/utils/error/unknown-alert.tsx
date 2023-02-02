import React, { useEffect } from 'react';

import Alert from '@mui/material/Alert';
import { ErrorAlert } from './alert';
import { useLogger } from 'hooks/use-logger';

export const ErrorInConsoleAlert: React.FC<{ error: unknown }> = (error) => {
  const [Logger] = useLogger(ErrorInConsoleAlert);

  useEffect(() => {
    Logger.debug('Unexpected error', error);
  }, [error]);

  return (
    <Alert severity='error'>
      Something went wrong. Details are available in the console.
    </Alert>
  )
}

// TODO: implement cause
export const UnknownErrorAlert: React.FC<{ error: unknown }> = ({ error }) => {

  return error instanceof Error ? <ErrorAlert error={error} /> : <ErrorInConsoleAlert error={error} />;

}

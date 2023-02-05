import React, { useEffect } from 'react';

import Alert from '@mui/material/Alert';
import { useLogger } from 'hooks/use-logger';
import AlertTitle from '@mui/material/AlertTitle';


export const UnknownErrorAlert: React.FC<{ error: unknown }> = ({ error }) => {
  const [Logger] = useLogger(UnknownErrorAlert);

  useEffect(() => {
    Logger.warn('Unexpected error |', { error });
  }, [error]);

  if (error && typeof error === 'object') {
    return (
      <Alert severity='error'>
        <AlertTitle>Failure</AlertTitle>
        {JSON.stringify(error, null, 2)}
      </Alert>
    )
  }

  return (
    <Alert severity='error'>
      Something went wrong. Details are available in the console.
    </Alert>
  )
}

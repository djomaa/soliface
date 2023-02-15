import React from 'react';

import { ErrorAlert } from './error-alert';
import { UnknownErrorAlert } from './unknown-alert';

// TODO: implement cause
export const ExceptionAlert: React.FC<{ error: unknown }> = ({ error }) => {
  if (error instanceof Error) {
    return <ErrorAlert error={error} />
  } else {
    return <UnknownErrorAlert error={error} />
  }
}



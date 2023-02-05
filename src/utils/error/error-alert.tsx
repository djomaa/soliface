import React from 'react';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

function parseErrorTitle(error: Error) {
  return `${error.name}: ${error.message}`;
}

function parseErrorStack(error: Error) {
  if (!error.stack) {
    return;
  }
  const title = parseErrorTitle(error);
  const stackOnly = error.stack.substring(title.length);
  return stackOnly
    .split('\n')
    .map((line, i) => {
      return <div key={i}>{line}</div>
    });
}

function parseErrorCause(oError: Error) {
  if (!oError.cause) {
    return;
  }
  if (oError.cause instanceof Error) {
    const error = oError.cause;
    const title = parseErrorTitle(error);
    // const stack = parseErrorStack(error);
    const cause = parseErrorCause(error);
    return (
      <div>
        <div>[cause]: {title}</div>
        {/* {stack} */}
        {cause}
      </div>
    )
  } else {
    return (
      <div>
        <div>caused by cannot parse</div>
      </div>
    )
  }
}

export const ErrorAlert: React.FC<{ error: Error }> = ({ error }) => {
  const title = `${error.name}: ${error.message}`
  const stack = parseErrorStack(error);
  const cause = parseErrorCause(error);

  return (
    <Alert severity='error'>
      <AlertTitle>{title}</AlertTitle>
      {/* {stack} */}
      {cause}
    </Alert>
  )
}

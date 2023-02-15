import React from 'react';

import Alert, { AlertProps } from '@mui/material/Alert';
import style from './full-width-alert.module.scss';

export const FullWidthAlert: React.FC<AlertProps> = (props) => {
  return (
    <Alert
      {...props}
      classes={{
        message: style.Message
      }}
    />
  );
}

import React from 'react'

import Alert from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'

import { IAsyncModalBaseProps } from 'contexts/modal'
import Snackbar from '@mui/material/Snackbar';

interface IProps extends Pick<IAsyncModalBaseProps, 'handleClose'> {
  text: string;
}
export const LoadingToast: React.FC<IProps> = (props) => {
  return (
    <Snackbar
      open={true}
      onClose={props.handleClose}
    >
      <Alert
        severity='info'
        variant='filled'
        icon={<CircularProgress color='inherit' size={20} />}
      >
        {props.text}
      </Alert >
    </Snackbar>
  )
}

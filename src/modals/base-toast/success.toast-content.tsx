import React from 'react'

import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import { IAsyncModalBaseProps } from 'contexts/modal'
import Snackbar from '@mui/material/Snackbar';

interface IProps extends Pick<IAsyncModalBaseProps, 'handleClose'> {
  text: string;
}
export const SuccessToast: React.FC<IProps> = (props) => {
  return (
    <Snackbar
      open={true}
      onClose={props.handleClose}
      autoHideDuration={5e3}
    >
      <Alert
        severity='success'
        variant='filled'
        action={(
          <IconButton onClick={props.handleClose} size='small' color='inherit'>
            <CloseIcon fontSize='inherit' color='inherit' />
          </IconButton>
        )}
      >
        {props.text}
      </Alert >
    </Snackbar >
  )
}

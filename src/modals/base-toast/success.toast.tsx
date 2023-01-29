import React, { useState } from 'react'

import Alert from '@mui/material/Alert'
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'

import Snackbar from '@mui/material/Snackbar';

interface IProps {
  text: string;
  onClose?: () => void;
}
export const SuccessToast: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true);

  const handleClose = () => {
    setOpen(false);
    if (props.onClose) {
      props.onClose();
    }
  }

  return (
    <Snackbar
      open={open}
      onClose={handleClose}
      autoHideDuration={5e3}
    >
      <Alert
        severity='success'
        variant='filled'
        action={(
          <IconButton onClick={handleClose} size='small' color='inherit'>
            <CloseIcon fontSize='inherit' color='inherit' />
          </IconButton>
        )}
      >
        {props.text}
      </Alert >
    </Snackbar >
  )
}

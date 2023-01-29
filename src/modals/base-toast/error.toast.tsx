import React, { useState } from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'


interface IProps {
  text: string;
}
export const ErrorToast: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true);

  return (
    <Snackbar
      open={open}
      onClose={() => setOpen(false)}
    >
      <Alert
        severity='error'
        variant='filled'
        action={(
          <IconButton onClick={() => setOpen(false)} size='small' color='inherit'>
            <CloseIcon fontSize='inherit' color='inherit' />
          </IconButton>
        )}
      >
        {props.text}
      </Alert >
    </Snackbar >
  )
}

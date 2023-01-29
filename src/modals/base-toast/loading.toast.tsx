import React from 'react'

import Alert from '@mui/material/Alert'
import Snackbar from '@mui/material/Snackbar';
import CircularProgress from '@mui/material/CircularProgress'


interface IProps {
  text: string;
}
export const LoadingToast: React.FC<IProps> = (props) => {
  return (
    <Snackbar
      open={true}
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

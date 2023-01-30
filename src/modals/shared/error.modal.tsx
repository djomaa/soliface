import React, { useMemo } from 'react'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { Modal } from 'libs/modals'
import { parseError } from 'utils/error'
import style from 'styles/common.module.scss';

import { Dialog } from '../base-dialog/base.dialog'

interface IProps {
  title: string;
  error: Error;
}

export const ErrorModal: Modal<IProps> = (props) => {

  const parsed = useMemo(() => {
    return parseError(props.error);
  }, [props.error])

  return (
    <Dialog
      open={true}
      onClose={() => props.onClose()}
    >
      <DialogTitle>
        <Stack
          direction='row'
          justifyContent='space-between'
        >
          {props.title}
          <Button
            color='error'
            variant='outlined'
            startIcon={<CloseIcon />}
            onClick={() => props.onClose()}
          >
            Close
          </Button>
        </Stack>
      </ DialogTitle>
      <DialogContent>
        <Alert
          severity='error'
          className={style.AlertSuccessContentFullWidth}
        >
          <AlertTitle>
            {parsed.title}
          </AlertTitle>
          {parsed.body}
        </Alert>
      </DialogContent>

    </Dialog >
  )
}

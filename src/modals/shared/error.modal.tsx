import React, { useMemo, useState } from 'react'

import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import AlertTitle from '@mui/material/AlertTitle'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { parseError } from 'utils/error'
import style from 'styles/common.module.scss';

import { Dialog, IDialogProps } from '../base-dialog/base.dialog'
import { DialogProps } from '@mui/material/Dialog'

interface IProps extends Pick<DialogProps, 'onClose'> {
  title: string;
  error: Error;
  dialogProps?: IDialogProps;
}

export const ErrorModal: React.FC<IProps> = (props) => {
  const [open, setOpen] = useState(true)

  const parsed = useMemo(() => {
    return parseError(props.error);
  }, [props.error])

  return (
    <Dialog
      open={open}
      {...props.dialogProps}
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
            onClick={() => setOpen(false)}
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

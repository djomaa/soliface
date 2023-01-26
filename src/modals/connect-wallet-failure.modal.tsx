import React, { useMemo } from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { AsyncModal } from 'contexts/modal'

import { useLogger } from 'hooks/use-logger'
import { Dialog } from './base-modal/base.dialog'
import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

import style from 'styles/common.module.scss';
import { parseError } from 'utils/error'
import Stack from '@mui/material/Stack'

interface IProps {
  title: string;
  error: Error;
}

export const ConnectWalletModal: AsyncModal<IProps> = (props) => {
  const [Logger, { logState }] = useLogger(ConnectWalletModal.name)

  const parsed = useMemo(() => {
    return parseError(props.error);
  }, [props.error])

  return (
    <Dialog>
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
            onClick={props.handleClose}
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
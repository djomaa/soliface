import React, { useMemo } from 'react'

import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { AsyncModal } from 'contexts/modal'

import { useLogger } from 'hooks/use-logger'
import { Dialog } from './base-modal/base.dialog'
import Button from '@mui/material/Button'
import CloseIcon from '@mui/icons-material/Close'

import { parseError } from 'utils/error'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'

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

        </Stack>
      </ DialogTitle>
      <DialogContent>
        <Typography variant='body2'>
          Hey! This website collects to improve perfomance and for some statistics
        </Typography>
        <Button
          color='error'
          variant='outlined'
          startIcon={<CloseIcon />}
          onClick={props.handleClose}
        >
          Close
        </Button>
      </DialogContent>

    </Dialog >
  )
}

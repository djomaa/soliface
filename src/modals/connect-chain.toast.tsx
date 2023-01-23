import { useAsync } from 'react-use'
import React, { useMemo } from 'react'

import IconButton from '@mui/material/IconButton'
import CloseIcon from '@mui/icons-material/Close'
import Alert, { AlertProps } from '@mui/material/Alert'
import CircularProgress from '@mui/material/CircularProgress'
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar'

import { Chain } from 'types/chain'
import { AsyncModal } from 'contexts/modal'
import { useChainCtx } from 'contexts/web3'
import { useLogger } from 'hooks/use-logger'
import { useDefaultRpc } from 'hooks/use-default-rpc'


interface IProps {
  chain: Chain
}

enum TabValue {
  Rpc = 'Rpc',
}

interface ContentProps extends AlertProps, Pick<SnackbarProps, 'autoHideDuration'> {
  text: string
}

export const ConnectChainToast: AsyncModal<IProps> = ({ chain, ...props }) => {
  const [Logger, { logState }] = useLogger(ConnectChainToast.name, chain.chainId)

  const chainCtx = useChainCtx()
  const [defaultRpc] = useDefaultRpc(chain.chainId)

  logState('defaultRpc', defaultRpc)

  const state = useAsync(async () => {
    chainCtx.changeChain(chain)
  }, [chainCtx.changeChain, chain])

  const { text, autoHideDuration, ...alertProps } = useMemo<ContentProps>(() => {
    if (state.loading) {
      return {
        severity: 'info',
        icon: <CircularProgress color='inherit' size={20} />,
        text: 'Connecting..'
      }
    }
    const closeAction = (
      <IconButton onClick={props.handleClose} size='small' color='inherit'>
        <CloseIcon fontSize='inherit' color='inherit' />
      </IconButton>
    )
    if (state.error != null) {
      return {
        severity: 'error',
        action: closeAction,
        text: state.error.message
      }
    }

    return {
      severity: 'success',
      text: 'Connected',
      autoHideDuration: 2e3
    }
  }, [state.error, state.loading])

  return (
    <Snackbar
      open={true}
      onClose={props.handleClose}
      message="Note archived"
      autoHideDuration={autoHideDuration}
    >
      <Alert
        {...alertProps}
        variant='filled'
      >
        {text}
      </Alert>
    </Snackbar>
  )
}

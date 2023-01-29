import React, { useState } from 'react'

import Menu from '@mui/material/Menu'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import Typography from '@mui/material/Typography'
import IconButton from '@mui/material/IconButton'
import InputAdornment from '@mui/material/InputAdornment'
import ChangeCircleOutlinedIcon from '@mui/icons-material/ChangeCircleOutlined'

import { cutAddress } from 'utils/address'
import { useChainCtx } from 'contexts/chain'
import { IWallet, useWalletList } from 'hooks/use-wallet-list'
import { ConnectWalletToast } from 'modals/connect-wallet.toast'
import { useModal } from 'modals/modal-factory'
import { useConnectWalletAction } from 'actions/connect-wallet'

export const WalletSelector: React.FC = () => {
  const chainCtx = useChainCtx()
  const { wallets } = useWalletList()

  const [anchor, setAnchor] = useState<HTMLElement>()

  const [connectWalletToast, setToastProps] = useModal(ConnectWalletToast);
  const { connectWallet } = useConnectWalletAction();

  const connect = (wallet: IWallet) => {
    setAnchor(undefined)
    // setToastProps({ wallet });
    connectWallet(wallet);
  }

  const disconnect = () => {
    setAnchor(undefined)
    chainCtx.disconnect()
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchor(undefined)
  }
  return (
    <>
      {connectWalletToast}
      {(chainCtx.wallet != null)
        ? (
          <Stack direction='row' alignItems='center'>
            <IconButton onClick={handleOpen}>
              <ChangeCircleOutlinedIcon />
            </IconButton>
            <Typography component={'div'}>
              <TextField
                disabled
                size='small'
                value={cutAddress(chainCtx.account)}
                inputProps={{
                  size: 8 + 4
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <chainCtx.wallet.icon />
                    </InputAdornment>
                  )
                }}
              />
            </Typography>
          </Stack>
        )
        : (
          <Button
            onClick={handleOpen}
          >
            Connect wallet
          </Button>
        )}
      <Menu
        keepMounted
        anchorEl={anchor}
        open={!(anchor == null)}
        onClose={handleClose}

      >
        {wallets.map((wallet) => {
          const isDisabled = !(chainCtx.wallet == null) && chainCtx.wallet.name === wallet.name
          return (
            <MenuItem
              key={wallet.name}
              onClick={() => { connect(wallet) }}
              disabled={isDisabled}
            >
              {wallet.name}
            </MenuItem>
          )
        })}
        {(chainCtx.wallet != null) && (
          <MenuItem
            onClick={() => { disconnect() }}
          >
            Disconnect
          </MenuItem>
        )}
      </Menu>
    </>
  )
}

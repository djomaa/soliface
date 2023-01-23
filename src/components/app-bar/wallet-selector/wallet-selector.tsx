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
import { useWalletList, IWallet } from 'hooks/use-wallet-list'

export const WalletSelector: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement>()
  const { wallets } = useWalletList()
  const web3Ctx = useChainCtx()

  const connect = (wallet: IWallet) => {
    setAnchor(undefined)
    web3Ctx.connectWallet(wallet)
  }

  const disconnect = () => {
    setAnchor(undefined)
    web3Ctx.disconnect()
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget)
  }

  const handleClose = () => {
    setAnchor(undefined)
  }
  return (
    <>
      {(web3Ctx.wallet != null)
        ? (
          <Stack direction='row' alignItems='center'>
            <IconButton onClick={handleOpen}>
              <ChangeCircleOutlinedIcon />
            </IconButton>
            <Typography component={'div'}>
              <TextField
                disabled
                size='small'
                value={cutAddress(web3Ctx.account)}
                inputProps={{
                  size: 8 + 4
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <web3Ctx.wallet.icon />
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
          const isDisabled = !(web3Ctx.wallet == null) && web3Ctx.wallet.name === wallet.name
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
        {(web3Ctx.wallet != null) && (
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

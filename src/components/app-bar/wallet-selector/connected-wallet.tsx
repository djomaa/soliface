import React from 'react'

import Stack from '@mui/material/Stack'
import SvgIcon from '@mui/material/SvgIcon'
import Typography from '@mui/material/Typography'

import { cutAddress } from 'utils/address'
import { IWallet } from 'hooks/use-wallet-list'

interface IProps {
  wallet: IWallet
  account: string
}

export const ConnectedWallet: React.FC<IProps> = ({ wallet, account }) => {
  return (
    <Stack direction='row'>
      <SvgIcon
        inheritViewBox
        component={wallet.icon}
      />
      <Typography>
        {cutAddress(account)}
      </Typography>

    </Stack>
  )
}

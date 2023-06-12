import React, { useMemo } from 'react'

import { useChainCtx } from 'contexts/chain'
import { useWalletList } from 'hooks/use-wallet-list'
import { useConnectWalletAction } from 'actions/connect-wallet'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'

const DisconnectValue = 'Disconnect';

export const WalletSelector: React.FC = () => {
  const chainCtx = useChainCtx()
  const { wallets } = useWalletList()
  const { connectWallet } = useConnectWalletAction();

  const options = useMemo(() => {
    return wallets.map((wallet) => (
      <MenuItem
        key={wallet.name}
        value={wallet.name}
        disabled={wallet.name === chainCtx.wallet?.name}
      >
        {wallet.name}
      </MenuItem>
    ));
  }, [wallets]);

  return (
    <TextField
      select
      fullWidth
      label='Wallet'
      value={chainCtx.wallet?.name ?? ''}
      onChange={(e) => {
        const wallet = wallets.find((wallet) => wallet.name === e.target.value);
        connectWallet(wallet!);
      }}
      InputProps={chainCtx.wallet ? {
        startAdornment: (
          <InputAdornment position='start'>
            <chainCtx.wallet.icon />
          </InputAdornment>
        )
      } : undefined}
    >
      {options}
      <MenuItem value={DisconnectValue}>
        <em>Disconnect</em>
      </MenuItem>
    </TextField>
  )
}

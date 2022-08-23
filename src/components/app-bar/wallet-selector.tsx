import React, { useState } from 'react';
import { useChainCtx } from 'contexts/web3';
import { AppBar as MuiAppBar, Button, CircularProgress, Toolbar, Box, AppBar, IconButton, Typography, Menu, MenuItem } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import { useWalletList, IWallet } from 'hooks/use-wallet-list';

export const WalletSelector: React.FC = () => {
  const [anchor, setAnchor] = useState<HTMLElement>()
  const { wallets } = useWalletList();
  const web3Ctx = useChainCtx();

  const connect = (wallet: IWallet) => {
    setAnchor(undefined);
    web3Ctx.connectWallet(wallet);
  }

  const disconnect = () => {
    setAnchor(undefined);
    web3Ctx.disconnect();
  }

  const handleOpen = (event: React.MouseEvent<HTMLElement>) => {
    setAnchor(event.currentTarget);
  }

  const handleClose = () => {
    setAnchor(undefined);
  }
  return (
    <>
      <Button
        onClick={handleOpen}
      >
        {web3Ctx.wallet ? 'Change wallet' : 'Connect wallet'}
      </Button>
      <Menu
        keepMounted
        anchorEl={anchor}
        open={!!anchor}
        onClose={handleClose}

      >
        {wallets.map((wallet) => {
          const isDisabled = !!web3Ctx.wallet && web3Ctx.wallet.name === wallet.name;
          return (
            <MenuItem
              key={wallet.name}
              onClick={() => connect(wallet)}
              disabled={isDisabled}
            >
              {wallet.name}
            </MenuItem>
          )
        })}
        {web3Ctx.wallet && (
          <MenuItem
            onClick={() => disconnect()}
          >
            Disconnect
          </MenuItem>
        )}
      </Menu>
    </>
  );
}

import React from 'react';
import { AppBar as MuiAppBar, Button, CircularProgress, Toolbar } from '@mui/material';
import { State } from './state';
import { ChainSelector } from './chain-selector';
import { useChainCtx } from 'contexts/web3';

export const AppBar: React.FC = () => {
  const ctx = useChainCtx();
  return (
    <MuiAppBar
      position="static"
      color='default'
      sx={{mb: 6}}
      >
      <Toolbar>
        <State />
        <ChainSelector />
        <Button
          onClick={() => {
            ctx.setConnector('metamask');
          }}
        >
          Connect MetaMask
        </Button>
      </Toolbar>
    </MuiAppBar>
  )
}

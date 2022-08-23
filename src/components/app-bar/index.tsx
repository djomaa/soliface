import React from 'react';
import { AppBar as MuiAppBar, Toolbar, Box } from '@mui/material';

import { State } from './state';
import { ChainSelector } from './chain-selector';
import { WalletSelector } from './wallet-selector';

export const AppBar: React.FC = () => {

  return (
    <MuiAppBar
      position="static"
      color='default'
      sx={{mb: 6}}
      >
      <Toolbar>
        <State />
        <Box sx={{ flexGrow: 1 }}>
          <ChainSelector />
        </Box>
        <WalletSelector />
      </Toolbar>
    </MuiAppBar>
  )
}

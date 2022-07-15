import React from 'react';
import { AppBar as MuiAppBar, CircularProgress, Toolbar } from '@mui/material';
import { State } from './state';
import { ChainSelector } from './chain-selector';

export const AppBar: React.FC = () => {
  return (
    <MuiAppBar
      position="static"
      color='default'
      sx={{mb: 6}}
      >
      <Toolbar>
        <State />
        <ChainSelector />
      </Toolbar>
    </MuiAppBar>
  )
}

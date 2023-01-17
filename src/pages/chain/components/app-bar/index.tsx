import React from 'react';
import Stack from '@mui/material/Stack';

import { AppBar } from 'components/app-bar';

import { State } from './state';
import { ChainSelector } from './chain-selector/chain-selector';
import { WalletSelector } from 'components/app-bar/wallet-selector';

export const ChainPageAppBar: React.FC = () => {

  return (
    <AppBar
      right={
        [
          <WalletSelector key='wallet-selector' />
        ]}
    />
  )
}

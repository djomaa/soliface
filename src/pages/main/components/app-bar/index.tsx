import React from 'react';
import Stack from '@mui/material/Stack';

import { AppBar } from 'components/app-bar';

import { State } from './state';
import { ChainSelector } from './chain-selector';
import { WalletSelector } from './wallet-selector/wallet-selector';

export const MainPageAppBar: React.FC = () => {

  return (
    <AppBar
      left={[
        <State key='state' />,
        <ChainSelector key='chainSelector' />,
      ]}
      center={[

      ]}
      right={[
        <WalletSelector key='wallet-selector' />
      ]}
    />
  )
}

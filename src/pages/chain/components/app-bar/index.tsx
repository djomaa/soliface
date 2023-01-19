import React from 'react';

import { AppBar } from 'components/app-bar';

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

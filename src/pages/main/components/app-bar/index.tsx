import React from 'react'

import { AppBar } from 'components/app-bar'

import { WalletSelector } from 'components/app-bar/wallet-selector'

import { State } from './state'
import { ChainSelector } from './chain-selector/chain-selector'

export const MainPageAppBar: React.FC = () => {
  return (
    <AppBar
      left={[
        <State key='state' />,
        <ChainSelector key='chainSelector' />
      ]}
      center={
        [

        ]}
      right={
        [
          <WalletSelector key='wallet-selector' />
        ]}
    />
  )
}

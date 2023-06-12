import React from 'react'

import { AddressInput } from './address'
import { ArtifactSelector } from './artifact'
import { ChainSelector } from './chain-selector/chain-selector.component'
import { WalletSelector } from './wallet-selector'

export const ContractConfig: React.FC = () => {
  return (
    <>
      <WalletSelector />
      <ChainSelector />
      <AddressInput />
      <ArtifactSelector />
    </>
  )
}

import React from 'react'

import { AddressInput } from './address'
import { ArtifactSelector } from './artifact'
import { ChainSelector } from './chain-selector'
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

import React from 'react';

import { AddressInput } from './address';
import { ArtifactSelector } from './artifact';

export const ContractConfig: React.FC = () => {
  return (
    <>
      <AddressInput />
      <ArtifactSelector />
    </>
  )
}

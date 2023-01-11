import React from 'react'

import { ArtifactCtxProvider } from 'contexts/artifact';
import { AbiManager } from 'components/abi-manager';

import { AbiPageAppBar } from './components/app-bar';

export const AbiPage: React.FC = () => {

  return (
    <ArtifactCtxProvider>
      <AbiPageAppBar />
      <AbiManager />
    </ArtifactCtxProvider>
  )
}

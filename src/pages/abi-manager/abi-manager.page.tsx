import React from 'react'

import { AbiManager } from 'components/abi-manager';

import { AbiManagerPageAppBar } from './components/app-bar';

export const AbiManagerPage: React.FC = () => {

  return (
    <>
      <AbiManagerPageAppBar />
      <AbiManager />
    </>
  )
}

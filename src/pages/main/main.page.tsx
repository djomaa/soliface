import React from 'react'

import { Contract } from 'components/contract'
import { useAppTitle } from 'hooks/use-app-title'
import { ChainCtxProvider } from 'contexts/chain'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      <Contract />
    </ChainCtxProvider >
  )
}


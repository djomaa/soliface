import React from 'react'


import { Contract } from 'components/contract'
import { useAppTitle } from 'hooks/use-app-title'
import { ChainCtxProvider } from 'contexts/chain'
import { MainPageAppBar } from './components/app-bar'
import { PageContainer } from 'components/page-container'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      <MainPageAppBar />
      <PageContainer>
        <Contract />
      </PageContainer>

    </ChainCtxProvider >
  )
}

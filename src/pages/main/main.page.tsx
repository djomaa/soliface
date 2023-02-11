import React from 'react'


import { Contract } from 'components/contract'
import { useAppTitle } from 'hooks/use-app-title'
import { ChainCtxProvider } from 'contexts/chain'
import { MainPageAppBar } from './components/app-bar'
import { PageContainer } from 'components/page-container'
import Typography from '@mui/material/Typography'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      <MainPageAppBar />
      <PageContainer>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          <sup>
            <span style={{
              borderBottom: '3px solid',
              fontWeight: '450',
              borderImage: 'linear-gradient(to right, black , white) 1',
            }}>
              Soli
            </span>
            dity
          </sup>
          {' '}
          <sub>
            Inter
            <span style={{
              borderBottom: '3px dashed',
              fontWeight: '450',
              borderImage: 'linear-gradient(to left, black , white) 1',
            }}>
              face
            </span>
          </sub>
        </Typography>
        <Contract />
      </PageContainer>

    </ChainCtxProvider >
  )
}

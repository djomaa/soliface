import React from 'react'

import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

import { Contract } from 'components/contract'
import { useAppTitle } from 'hooks/use-app-title'
import { ChainCtxProvider } from 'contexts/chain'
import { MainPageAppBar } from './components/app-bar'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      <MainPageAppBar />
      <Box mt={5}>
        <Container>
          <Contract />
        </Container>
      </Box>
    </ChainCtxProvider >
  )
}

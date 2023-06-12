import React from 'react'


import { Contract } from 'components/contract'
import { useAppTitle } from 'hooks/use-app-title'
import { ChainCtxProvider } from 'contexts/chain'
// import { MainPageAppBar } from './components/app-bar'
// import { PageContainer } from 'components/page-container'
// import Typography from '@mui/material/Typography'
// import { Footer } from 'components/footer'
// import Drawer from '@mui/material/Drawer'
// import Box from '@mui/material/Box'
// import { SiteNavigation } from 'components/site-navigation'
import { PageContainer } from 'components/page-container'

export const MainPage: React.FC = () => {
  useAppTitle();
  return (
    <ChainCtxProvider>
      {/* <MainPageAppBar /> */}
      {/* <PageContainer> */}
      {/* <Typography
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
              borderImage: 'linear-gradient(to right, black, white) 1',
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
        </Typography> */}
      {/* <Drawer
          open
          variant='permanent'
        > */}
      <PageContainer>
        <Contract />
      </PageContainer>
      {/* <Box
        // mt={ }
        display='flex'
        flexDirection='row'
        flexGrow={1}
      >
        <SiteNavigation />
        <Box
          flexGrow={1}
          ml={4}
          mr={4}
          mt={5}
          mb={5}
        >
          <Contract />
          <Footer />
        </Box>
      </Box> */}
      {/* </PageContainer> */}

    </ChainCtxProvider >
  )
}

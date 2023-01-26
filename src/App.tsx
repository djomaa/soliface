import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  // useLocation
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import { MainPage } from 'pages/main'
import { ChainPage } from 'pages/chain'
import { Page404 } from 'pages/page-404'
import { Route } from 'constants/route'
import { AbiManagerPage } from 'pages/abi-manager'
import { ChainManagerPage } from 'pages/chain-manager'
import { useEffect } from 'react'
import { AnalyticsCtxProvider, useAnalytics } from 'contexts/analytics'
import { ModalCtxProvider } from 'contexts/modal'
import { ContractCtxProvider } from 'contexts/contract'

import React, { FC, ReactElement } from "react";
import { AppBar, Typography } from "@mui/material";
import Box from '@mui/system/Box'
import { Cookies } from 'components/cookies'
import { StorageCtxProvider } from 'contexts/storage'

export const Footer: FC = (): ReactElement => {
  return (
    <AppBar
      sx={{ top: 'auto', bottom: 0 }}
    >
      <Box>
        <Typography variant='body2'>
          Hey! This website collects to improve perfomance and for some statistics
        </Typography>
      </Box>
    </AppBar>
  );
};

export default Footer;

const Layout: React.FC = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({})
  }, [analytics]);

  return (
    <StorageCtxProvider>
      <ModalCtxProvider>
        <ContractCtxProvider>
          <CssBaseline />
          <main>
            <Cookies />
            <Outlet />
          </main>
          <Footer />
        </ContractCtxProvider>
      </ModalCtxProvider>
    </StorageCtxProvider>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <MainPage />,
      },
      {
        path: Route.AbiManager,
        element: <AbiManagerPage />
      },
      {
        path: Route.ChainManager,
        element: <ChainManagerPage />
      },
      {
        path: Route.Chain,
        element: <ChainPage />
      },
      {
        path: '*',
        element: <Page404 />
      }
    ]
  }
])

export const App: React.FC = () => {
  return (
    <AnalyticsCtxProvider>
      <RouterProvider router={router} />
    </AnalyticsCtxProvider>
  )
}

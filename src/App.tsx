import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import { MainPage } from 'pages/main'
import { Route } from 'constants/route'
import { ChainPage } from 'pages/chain'
import { Page404 } from 'pages/page-404'
import { Cookies } from 'components/cookies'
import { QueryCtxProvider } from 'contexts/query'
import { ModalCtxProvider } from 'contexts/modal'
import { AbiManagerPage } from 'pages/abi-manager'
import { StorageCtxProvider } from 'contexts/storage'
import { ChainManagerPage } from 'pages/chain-manager'
import { ContractCtxProvider } from 'contexts/contract'
import { AnalyticsCtxProvider, useAnalytics } from 'contexts/analytics'

const Layout: React.FC = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({})
  }, [analytics]);

  return (
    <StorageCtxProvider>
      <QueryCtxProvider>
        <ModalCtxProvider>
          <ContractCtxProvider>
            <CssBaseline />
            <main>
              <Cookies />
              <Outlet />
            </main>
          </ContractCtxProvider>
        </ModalCtxProvider>
      </QueryCtxProvider>
    </StorageCtxProvider >
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

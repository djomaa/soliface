import * as React from 'react'
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

const Layout: React.FC = () => {
  const analytics = useAnalytics();

  useEffect(() => {
    analytics.page({})
  }, [analytics]);

  return (
    <>
      <CssBaseline />
      <main>
        <Outlet />
      </main>
    </>
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

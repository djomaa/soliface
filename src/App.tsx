import * as React from 'react'
import {
  createBrowserRouter,
  Outlet,
  RouterProvider
} from 'react-router-dom'

import CssBaseline from '@mui/material/CssBaseline'

import { MainPage } from 'pages/main'
import { ChainPage } from 'pages/chain'
import { Page404 } from 'pages/page-404'
import { Route as Rr } from 'constants/route'
import { AbiManagerPage } from 'pages/abi-manager'
import { ChainManagerPage } from 'pages/chain-manager'

const Layout: React.FC = () => {
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
        element: <MainPage />
      },
      {
        path: Rr.AbiManager,
        element: <AbiManagerPage />
      },
      {
        path: Rr.ChainManager,
        element: <ChainManagerPage />
      },
      {
        path: Rr.Chain,
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
    <RouterProvider router={router} />
  )
}

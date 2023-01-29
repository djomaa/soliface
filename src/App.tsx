import React, { useEffect } from "react";
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
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
import { StorageCtxProvider } from 'contexts/store'
import { ChainManagerPage } from 'pages/chain-manager'
import { ContractCtxProvider } from 'contexts/contract'
import { AnalyticsCtxProvider, useAnalytics } from 'contexts/analytics'
// import 'material-react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import { ModalContainer } from 'libs/modals/modal';
import { useLogger } from 'hooks/use-logger';


const Layout: React.FC = () => {
  const [Logger] = useLogger(Layout);
  const analytics = useAnalytics();
  const location = useLocation();

  // useEffect(() => {
  //   Logger.debug('Page changed', { to: location });
  // }, [location])

  useEffect(() => {
    Logger.debug('Page changed', location);
    analytics.page({})
  }, [analytics, location]);

  return (
    <StorageCtxProvider>
      <QueryCtxProvider>
        <ModalCtxProvider>
          <ContractCtxProvider>
            <Box>
              <CssBaseline />
              <main>
                <Cookies />
                <Outlet />
              </main>
              <ToastContainer
                position="bottom-left"
                closeButton
              />
              <ModalContainer />
            </Box>
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

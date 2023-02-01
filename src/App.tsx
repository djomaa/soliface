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
import { Page404 } from 'pages/404.page'
import { Cookies } from 'components/cookies'
import { QueryCtxProvider } from 'contexts/query'
import { ModalCtxProvider } from 'contexts/modal'
import { ArtifactManagerPage } from 'pages/artifact/manager'
import { StorageCtxProvider } from 'contexts/store'
import { ChainManagerPage } from 'pages/chain-manager'
import { ContractCtxProvider } from 'contexts/contract'
import { AnalyticsCtxProvider, useAnalytics } from 'contexts/analytics'
// import 'material-react-toastify/dist/ReactToastify.css';
import 'react-toastify/dist/ReactToastify.css';
import { ToastContainer } from 'react-toastify';
import Box from '@mui/material/Box';
import { ModalContainer } from 'libs/modals/modal-container';
import { useLogger } from 'hooks/use-logger';
import { CreateArtifactPage } from 'pages/artifact/create';
import { EditArtifactPage } from 'pages/artifact/edit';


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
          <Box>
            <CssBaseline />
            <main>
              <Cookies />
              <ContractCtxProvider>
                <Outlet />
              </ContractCtxProvider>
            </main>
            <ToastContainer
              position="bottom-left"
              closeButton
            />
            <ModalContainer />
          </Box>
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
        path: Route.ArtifactManager,
        element: <ArtifactManagerPage />
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
        path: Route.CreateArtifact,
        element: <CreateArtifactPage />
      },
      {
        path: Route.EditArtifact,
        element: <EditArtifactPage />
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

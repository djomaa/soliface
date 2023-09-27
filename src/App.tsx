import React, { Suspense, useEffect } from "react";
import { ToastContainer } from 'react-toastify';
import {
  createBrowserRouter,
  Outlet,
  RouterProvider,
  useLocation,
} from 'react-router-dom'

import Box from '@mui/material/Box';
import Skeleton from '@mui/material/Skeleton';
import CssBaseline from '@mui/material/CssBaseline'

import { Route } from 'constants/route'
import { Cookies } from 'components/cookies'
import { useLogger } from 'hooks/use-logger';
import { StorageCtxProvider } from 'contexts/store'
import { PageContainer } from 'components/page/container';
import { PageComponents } from 'components/page/components';
import { ModalContainer } from 'libs/modals/modal-container';
import { reactLazyComponent } from 'libs/react-dynamic-load';
import { AnalyticsCtxProvider, useAnalytics } from 'contexts/analytics'

import 'react-toastify/dist/ReactToastify.css';


const Layout: React.FC = () => {
  const [Logger] = useLogger(Layout);
  const analytics = useAnalytics();
  const location = useLocation();

  useEffect(() => {
    Logger.debug('Page changed', location);
    analytics.page({})
  }, [analytics, location]);

  return (
    <>
      <CssBaseline />
      <StorageCtxProvider>
        <main>
          <PageComponents />
          <PageContainer>
            <Cookies />
            <Outlet />
          </PageContainer>
        </main>
        <ModalContainer />
      </StorageCtxProvider >
      <ToastContainer
        position="bottom-left"
        closeButton
      />
    </>
  )
}

const withSuspense = <
  Component extends React.ComponentType<any>,
  Export extends Record<string, Component>,
  Key extends keyof Export,
>(
  factory: () => Promise<Export>,
  key: Key,
  props: React.ComponentProps<Component>
): React.ReactNode => {
  const Component = reactLazyComponent(factory, key)
  const loader = (
    <Box height='100%'>
      <Skeleton height='4rem' />
      <Skeleton animation="wave" height='4rem' />
      <Skeleton height='4rem' />
      <Skeleton height='4rem' />
      <Skeleton animation="wave" height='4rem' />
      <Skeleton height='4rem' />
      <Skeleton height='4rem' />
      <Skeleton animation="wave" height='4rem' />
      <Skeleton height='4rem' />
    </Box>
  );
  return (
    <Suspense fallback={loader}>
      <Component {...props} />
    </Suspense>
  )
}

const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: withSuspense(() => import('pages/main'), 'MainPage', {}),
      },
      {
        path: Route.ArtifactManager,
        element: withSuspense(() => import('pages/artifact/manager'), 'ArtifactManagerPage', {}),
      },
      {
        path: Route.ChainManager,
        element: withSuspense(() => import('pages/chain-manager'), 'ChainManagerPage', {}),
      },
      {
        path: Route.Chain,
        element: withSuspense(() => import('pages/chain'), 'ChainPage', {}),
      },
      {
        path: Route.CreateArtifact,
        element: withSuspense(() => import('pages/artifact/create'), 'CreateArtifactPage', {}),
      },
      {
        path: Route.EditArtifact,
        element: withSuspense(() => import('pages/artifact/edit'), 'EditArtifactPage', {}),
      },
      {
        path: '*',
        element: withSuspense(() => import('pages/404.page'), 'Page404', {}),
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

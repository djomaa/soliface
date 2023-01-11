import * as React from 'react';
import {
  createBrowserRouter,
  RouterProvider,
} from "react-router-dom";

import CssBaseline from '@mui/material/CssBaseline';

import { AbiPage } from 'pages/abi';
import { MainPage } from 'pages/main';
import { Route } from 'constants/route';

const router = createBrowserRouter([
  {
    path: Route.Home,
    element: <MainPage />,
  },
  {
    path: Route.Abi,
    element: <AbiPage />,
  },
]);

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <main>
        <RouterProvider router={router} />
      </main>
    </>
  )
}

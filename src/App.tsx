import * as React from 'react';
import { MainPage } from 'pages/main.page';
import { AppBar } from 'components/app-bar';
import { CssBaseline } from '@mui/material';

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <main>
      <MainPage />
      </main>
    </>
  )
}

import * as React from 'react';
import { MainPage } from 'pages/main.page';
import { CssBaseline } from '@mui/material';

export const App: React.FC = () => {
  return (
    <>
      <CssBaseline />
      <MainPage />
    </>
  )
}

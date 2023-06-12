import React from 'react'
import Box from '@mui/material/Box'
// import Container from '@mui/material/Container'
// import { AppBar } from 'components/app-bar'
import { SideNav } from 'components/side-nav'
// import Paper from '@mui/material/Paper'
import { SolifaceIcon } from 'media/soliface'
import Typography from '@mui/material/Typography'
import { isMobile } from 'react-device-detect';
import styles from './page-container.module.scss';

const min = '56px';
const max = isMobile ? '60vw' : '20vw';
const inititalOpen = false;

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {

  return (
    <>
      <header
        style={{
          top: 0,
          left: 0,
          position: 'fixed',
          zIndex: 1200,
          height: '63px',
          width: '100vw',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          paddingLeft: '1rem',
          backgroundColor: 'white',
          borderBottom: '1px solid rgba(0, 0, 0, 0.2)',
        }}
      >
        <Box
          display='flex'
          alignItems='center'
          justifyContent='center'
          flexDirection='column'
        >
          <SolifaceIcon fontSize='large' />
          <Typography
            variant='overline'
            fontSize='1.2rem'
            lineHeight='1.2rem'
          // textTransform='none'
          >SoliFace</Typography>
        </Box>
      </header>
      <aside
        style={{
          position: 'fixed',
          top: '63px',
          left: 0,
          height: 'calc(100% - 62px)',
          // minWidth: '50px',
          zIndex: 1200,
          backgroundColor: 'white',
          borderRight: '1px solid rgba(0, 0, 0, 0.2)',
        }}
      >
        <SideNav
          minWidth={min}
          maxWidth={max}
        />
      </aside>
      <Box
        mt='10vh'
        mb='2rem'
        ml={min}
        p='2rem'
      >
        {children}
      </Box>
    </>
  );
}

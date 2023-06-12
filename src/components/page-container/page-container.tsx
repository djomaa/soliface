import React from 'react'
import { isMobile } from 'react-device-detect';

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SideNav } from 'components/side-nav'
import { SolifaceIcon } from 'media/soliface'

import styles from './page-container.module.scss';

const MIN = '56px';
const MAX = isMobile ? '60vw' : '20vw';

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {

  return (
    <>
      <header
        className={styles.pageContainerHeader}
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
          >
            SoliFace
          </Typography>
        </Box>
      </header>
      <aside
        className={styles.pageContainerSideNav}
      >
        <SideNav
          minWidth={MIN}
          maxWidth={MAX}
        />
      </aside>
      <Box
        className={styles.pageContainerContent}
        ml={MIN}
      >
        {children}
      </Box>
    </>
  );
}

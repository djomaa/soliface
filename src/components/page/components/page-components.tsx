import React from 'react'

import Box from '@mui/material/Box'
import Typography from '@mui/material/Typography'

import { SideNav } from 'components/side-nav'
import { SolifaceIcon } from 'media/soliface'

import { MAX, MIN } from '../constants'

import styles from '../page-container.module.scss';

export const PageComponents: React.FC = () => {

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
    </>
  );
}

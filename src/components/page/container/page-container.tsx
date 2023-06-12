import React from 'react';

import Box from '@mui/material/Box';

import { MIN } from '../constants';
import styles from '../page-container.module.scss';

export const PageContainer: React.FC<React.PropsWithChildren> = (props) => {
  return (
    <Box
      className={styles.pageContainerContent}
      ml={MIN}
    >
      {props.children}
    </Box>
  )
}

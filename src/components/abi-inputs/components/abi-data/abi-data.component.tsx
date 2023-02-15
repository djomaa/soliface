
import React from 'react'

import Box, { BoxProps } from '@mui/material/Box'


import { useToggle } from 'react-use'

import { Collapse, IconButton, Typography } from '@mui/material'
import ArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowUp from '@mui/icons-material/KeyboardDoubleArrowUp';
import Grid from '@mui/material/Unstable_Grid2/Grid2'

import style from './abi-data.module.scss'
import { Child } from 'components/child';

export interface IProps {
  headerTitle: React.ReactNode;
  headerSubtitle: React.ReactNode;
  headerActions?: React.ReactNode | React.ReactNode[];
  children: React.ReactNode;
  sx: BoxProps['sx'];
}

export const AbiInputData: React.FC<IProps> = (props) => {
  const [open, toggleOpen] = useToggle(true);

  return (
    <Box mt={1}
      sx={props.sx}
      className={style.Container}
    >
      <Box
        pl={1} pr={1}
        className={style.Header}
      >
        <Grid container
          justifyContent='space-between'
          alignItems='center'
        >
          <Grid xs={12} md={4}>
            <Typography
              color='text.secondary'
            >
              {props.headerTitle}
            </Typography>
          </Grid>
          <Grid xs={12} md={4} textAlign='center'>
            <Box>
              {props.headerActions}
            </Box>
          </Grid>
          <Grid xs={12} md={4}
            textAlign='right'
            display='flex'
            flexDirection='row'
            justifyContent='flex-end'
            alignItems='center'
          >
            <Typography
              color='text.secondary'
            >
              {props.headerSubtitle}
            </Typography>
            <IconButton size='small' onClick={toggleOpen}>
              {open ? <ArrowDown fontSize='small' /> : <ArrowUp fontSize='small' />}
            </IconButton>
            {/* </Box> */}
          </Grid>
        </Grid>
      </Box>
      <Collapse in={open}>
        <Child y>
          <Box pl={1} pb={1}>
            {props.children}
          </Box>
        </Child>
      </Collapse>
    </Box >
  )
}

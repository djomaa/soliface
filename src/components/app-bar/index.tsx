import React from 'react'

import Stack from '@mui/material/Stack'
import Toolbar from '@mui/material/Toolbar'
import MuiAppBar from '@mui/material/AppBar'

import { SolifaceIcon } from 'media/soliface'

import { PageSelector } from './page-selector'

interface IAppBarProps {
  left?: JSX.Element[]
  center?: JSX.Element[]
  right?: JSX.Element[]
}
export const AppBar: React.FC<IAppBarProps> = ({ left = [], center = [], right = [] }) => {
  return (
    <MuiAppBar
      position="sticky"
      color='default'
    // sx={{ mb: 6 }} 
    >
      <Toolbar>
        <Stack direction='row' alignItems='center' justifyContent='space-between' width='100%'>
          <Stack direction='row' alignItems='center'>
            <PageSelector />
            {left}
          </Stack>
          <Stack direction='row' alignItems='center'>
            <SolifaceIcon />
            {center}
          </Stack>
          {right && (
            <Stack direction='row' alignItems='center'>
              {right}
            </Stack>
          )}
        </Stack>
      </Toolbar>
    </MuiAppBar >
  )
}

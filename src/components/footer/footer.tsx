import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Stack from '@mui/material/Stack'
import { Typography } from '@mui/material'

export const Footer: React.FC = () => {
  return (
    <AppBar
      position="relative"
      color="default"
      sx={{ top: 'auto', bottom: 0 }}
    >
      <Toolbar>
        <Stack
          direction='row'
          justifyContent='space-between'
          sx={{ width: '100%' }}
        >
          <Typography
            variant='overline'
          >
            {process.env.REACT_APP_VERSION}
          </Typography>
          <Typography
            sx={{
              textDecoration: 'none',
            }}
            component='a'
            variant='overline'
            href={`mailto:${process.env.REACT_APP_CONTACT_EMAIL}`}
          >
            {process.env.REACT_APP_CONTACT_EMAIL}
          </Typography>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

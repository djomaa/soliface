import React from 'react'

import Stack from '@mui/material/Stack'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import { Box, IconButton, Typography } from '@mui/material'
import GitHubIcon from '@mui/icons-material/GitHub';

export const Footer: React.FC = () => {
  console.log('process.env', process.env);

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
          <Box>
            <IconButton
              onClick={() => {
                window.open(process.env.REACT_APP_REPOSITORY_URL)
              }}
            >
              <GitHubIcon />
            </IconButton>
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
          </Box>
        </Stack>
      </Toolbar>
    </AppBar>
  )
}

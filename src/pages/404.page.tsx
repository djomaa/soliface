import React from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'
import Typography from '@mui/material/Typography'

interface IProps {
  reason?: string
}
export const Page404: React.FC<IProps> = ({ reason }) => {
  return (
    <>
      <Container>
        <Stack direction='row' justifyContent='space-around'>
          <Stack spacing={3} alignItems='center'>
            <Box>
              <Typography variant='h1'>
                404
              </Typography>
              <Typography variant='h5'>
                Page not found
              </Typography>
            </Box>
            {reason && (
              <Alert severity='warning'>
                <Typography>
                  {reason}
                </Typography>
              </Alert>
            )}
          </Stack>
        </Stack>
      </Container>
    </>
  )
}

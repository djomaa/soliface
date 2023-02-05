import React from 'react'
import Box from '@mui/material/Box'
import Container from '@mui/material/Container'

export const PageContainer: React.FC<React.PropsWithChildren> = ({ children }) => {
  return (
    <Box
      mt={5}
    >
      <Container>
        {children}
      </Container>
      <Box height='20vh' />
    </Box >
  )
}

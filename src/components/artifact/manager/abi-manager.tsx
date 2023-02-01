import React from 'react'

import Container from '@mui/system/Container'
import Typography from '@mui/material/Typography'



import { useLogger } from 'hooks/use-logger'

import { AbiList } from './list/abi-list'

export const AbiManager: React.FC = () => {
  const [logger, { logState }] = useLogger(AbiManager)

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        ABI Manager
      </Typography>
      <AbiList />
    </Container>
  )
}

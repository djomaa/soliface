import React from 'react'

import Box from '@mui/material/Box'
import Skeleton from '@mui/material/Skeleton'

export const EmptyContract = () => {
  return (
    <Box>
      <Skeleton variant="rectangular" height={100} />
      <br />
      <Skeleton variant="rectangular" height={100} />
      <br />
      <Skeleton variant="rectangular" height={100} />
      <br />
      <Skeleton variant="rectangular" height={100} />
    </Box>
  )
}

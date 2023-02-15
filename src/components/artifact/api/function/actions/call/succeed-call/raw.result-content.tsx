import React from 'react'

import Box from '@mui/system/Box'
import Typography from '@mui/material/Typography'

export const RawResultContent: React.FC<{ result: string }> = ({ result }) => {
  return (

    <Box
      sx={{
        wordBreak: 'break-all',
        border: '1px solid #C0C0C0',
        backgroundColor: '#E0E0E0',
        borderRadius: '5px',
        padding: 1
      }}
    >
      <Typography>
        {result}
      </Typography>
    </Box>
  )
}

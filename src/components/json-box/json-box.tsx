import React from 'react'

import TextField from '@mui/material/TextField'

export const JsonBox: React.FC<{ value: any }> = ({ value }) => {
  return (
    <TextField
      maxRows={20}
      fullWidth
      multiline
      variant='outlined'
      value={JSON.stringify(value, null, 2)}
    />
  )
}

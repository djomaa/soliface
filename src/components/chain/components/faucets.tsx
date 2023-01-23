import Box from '@mui/material/Box'
import React, { useMemo } from 'react'
import { DataGrid } from '@mui/x-data-grid'

import { Chain } from 'types/chain'

const Columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'url',
    headerName: 'URL',
    flex: 1
  }
]

export const FaucetsElement: React.FC<Chain> = (chain: Chain) => {
  const rows = useMemo(() => {
    return chain.faucets.map((url, id) => {
      return { id, url }
    })
  }, [chain])

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={Columns}
      />
    </Box>
  )
}

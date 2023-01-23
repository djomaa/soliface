import React, { useMemo } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import { useLogger } from 'hooks/use-logger'
import { searchChain, useChainList } from 'hooks/use-chain-list'

import { ChainCard } from './chain-card'
import { useSearch } from 'hooks/use-search'

export const ChainManager: React.FC = () => {
  const [Logger] = useLogger(ChainManager.name)
  const { chainList } = useChainList()
  const [search, setSearch, searchList] = useSearch(chainList, searchChain)

  const list = useMemo(() => {
    return searchList.map((chain) => {
      return (
        <Grid key={chain.chainId} xs={12} sm={4}>
          <ChainCard key={chain.chainId} {...chain} />
        </Grid>
      )
    })
  }, [searchList]);

  return (
    <Box>
      <Stack spacing={1}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
          gutterBottom
        >
          Chains Manager
        </Typography>
        <TextField
          fullWidth
          label='Search'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <Grid container spacing={2}>
          {list}
        </Grid>
      </Stack>
    </Box >
  )
}

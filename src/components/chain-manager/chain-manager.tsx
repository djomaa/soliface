import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import { Chain } from 'types/chain';
import { useChainList } from 'hooks/use-chain-list';
import { ChainCard } from './chain-card';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2';
import Stack from '@mui/material/Stack';
import { CircularProgress } from '@mui/material';
import { useDebounce } from 'use-debounce';
import { useLogger } from 'hooks/use-logger';



export const ChainManager: React.FC = () => {
  const [Logger] = useLogger(ChainManager.name);
  const { chainList } = useChainList();
  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 500);

  const list = useMemo(() => {
    // TODO:- add timings for filtering and mapping
    const logger = Logger.sub('useMemo', 'list');
    const query = debouncedSearch;
    const regExpQuery = new RegExp(query, 'i');
    const numberQuery = Number(query);
    const isNumber = !Number.isNaN(numberQuery);
    logger.debug('Searching', { query, originalCount: chainList.length });
    const filtered = chainList
      .filter((chain) => {

        if (chain.name.match(regExpQuery)) {
          return true;
        }

        if (chain.shortName.match(regExpQuery)) {
          return true;
        }

        if (isNumber) {
          if (chain.chainId === numberQuery) {
            return true;
          }
        }

        return false;
      })
    logger.debug('Search finished', { query, filteredCount: filtered.length })
    return filtered.map((chain) => {
      return (
        <Grid key={chain.chainId} xs={12} sm={4}>
          <ChainCard key={chain.chainId} {...chain} />
        </Grid>
      )
    });
  }, [debouncedSearch, chainList]);

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
          onChange={(e) => setSearch(e.target.value)}
        />
        <Grid container spacing={2}>
          {list}
        </Grid>
      </Stack>
    </Box >
  );
}

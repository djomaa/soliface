import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import { Chain } from 'types/chain';
import { useChainList } from 'hooks/use-chain-list';
import { ChainCard } from './chain-card';
import Grid from '@mui/material/Grid';



export const ChainManager: React.FC = () => {
  const { chainList } = useChainList();
  const [search, setSearch] = useState('');

  const list = useMemo(() => {
    return [chainList[0]].map((chain) => {
      return <ChainCard key={chain.chainId} {...chain} />
    });
  }, [search, chainList]);

  return (
    <Box>
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
      <Grid container>
        {list}
      </Grid>
    </Box >
  );
}

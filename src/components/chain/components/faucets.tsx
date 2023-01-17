import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import { Chain } from 'types/chain';
import { useChainList } from 'hooks/use-chain-list';
import { ChainCard } from '../chain-card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { numberToHex } from 'utils/number.utils';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { withStyles } from '@mui/material/styles';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import { DataGrid } from '@mui/x-data-grid';

const Columns = [
  { field: 'id', headerName: 'ID' },
  {
    field: 'url',
    headerName: 'URL',
    flex: 1,
  },
]

export const FaucetsElement: React.FC<Chain> = (chain: Chain) => {
  const rows = useMemo(() => {
    return chain.faucets.map((url, id) => {
      return { id, url };
    })
  }, [chain]);

  return (
    <Box sx={{ width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={Columns}
      />
    </Box>
  );
}

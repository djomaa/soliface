import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react'
import InfiniteScroll from 'react-infinite-scroll-component';

import Box from '@mui/material/Box'
import Link from '@mui/material/Link'
import Stack from '@mui/material/Stack'
import TextField from '@mui/material/TextField'
import Grid from '@mui/material/Unstable_Grid2'
import Typography from '@mui/material/Typography'

import { DepcrecatedChainType } from 'types/chain';
import { useLogger } from 'hooks/use-logger'
import { useSearch } from 'hooks/use-search'
import { searchChain, useChainList } from 'hooks/use-chain-list/use-chain-list'

import { withCtx } from 'contexts/ctx-factory';
import { QueryCtxProvider } from 'contexts/query';
import Button from '@mui/material/Button';
import { modal } from 'libs/modals';
import { SyncChainsModal } from './sync-chains/sync-chains.modal';
import { ChainList } from './chain-list/chain.list';

const PageSize = 6;
const ChainManagerCore: React.FC = () => {
  const [Logger] = useLogger(ChainManagerCore.name)



  return (
    <Box>
      <Stack spacing={1}>
        <Typography
          component="h1"
          variant="h2"
          align="center"
          color="text.primary"
        >
          Chains Manager
        </Typography>
        <Typography
          align='center'
          variant='body1'
        >
          Inspired by <Link href='https://chaind.network' target='_blank'>chaind.network</Link>
        </Typography>
        <Typography
          align='center'
          variant='body1'
        >
          Also that's the source of chain list
        </Typography>
      </Stack>
      <Button
        onClick={() => modal.show(SyncChainsModal, {})}
      >
        Sync
      </Button>
      <ChainList />
    </Box >
  )
}

export const ChainManager = withCtx(QueryCtxProvider, ChainManagerCore);

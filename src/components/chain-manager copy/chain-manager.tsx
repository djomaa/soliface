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

import { ChainCard } from './chain.card'
import { withCtx } from 'contexts/ctx-factory';
import { QueryCtxProvider } from 'contexts/query';

const PageSize = 6;
const ChainManagerCore: React.FC = () => {
  const [Logger] = useLogger(ChainManagerCore.name)
  const { chainList } = useChainList()
  const [search, setSearch, searchList] = useSearch(chainList, searchChain)
  const page = useRef(0);

  const [items, setItems] = useState<DepcrecatedChainType[]>([])

  useEffect(() => {
    page.current = 2;
    setItems(searchList.slice(0, PageSize * 2));
    Logger.debug('Refresh', { page: page.current, newItem: searchList.slice(0, PageSize), items });
  }, [searchList])

  const list = useMemo(() => {
    return items.map((chain) => {
      return (
        <Grid key={chain.chainId} xs={12} sm={4} md={2}>
          <ChainCard key={chain.chainId} {...chain} />
        </Grid>
      )
    })
  }, [items]);

  const handleNext = useCallback(() => {
    page.current += 1;
    const from = PageSize * page.current;
    const to = Math.min(from + PageSize, searchList.length);
    const newItems = searchList.slice(from, to);
    setItems((prev) => [...prev, ...newItems]);
    Logger.debug('Handle next', { from, to, newItems })
  }, []);


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
        <TextField
          fullWidth
          label='Search'
          value={search}
          onChange={(e) => { setSearch(e.target.value) }}
        />
        <InfiniteScroll
          scrollThreshold={0.2}
          dataLength={items.length}
          next={handleNext}
          hasMore={items.length < searchList.length}
          loader={<></>}
        // loader={<Skeleton width='100%' height='100px' variant='text' />}
        >
          <Grid container spacing={2}>
            {list}
          </Grid>
        </InfiniteScroll>
      </Stack>
    </Box >
  )
}

export const ChainManager = withCtx(QueryCtxProvider, ChainManagerCore);

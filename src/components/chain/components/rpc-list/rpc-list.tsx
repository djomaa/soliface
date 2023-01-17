import Box from '@mui/material/Box';
import React, { useMemo } from 'react';
import { DataGrid } from '@mui/x-data-grid';
import { QueryClient, QueryClientProvider } from 'react-query';

import { Chain } from 'types/chain';

import { useRpcListQuery } from './query';
import { useRpcListColumns } from './rpc-list.columns';
import { getStatusWeight } from './rpc-list.utils';
import { useRpcMap } from 'hooks/use-rpc-map';
import { useDefaultRpc } from 'hooks/use-default-rpc';
import { useWalletList } from 'hooks/use-wallet-list';
import { useChainCtx } from 'contexts/web3';
import { ModalCtxProvider } from 'contexts/modal/modal.context';

export const RpcListCore: React.FC<Chain> = (chain: Chain) => {

  const { defaultRpc } = useDefaultRpc(chain.chainId);

  const columns = useRpcListColumns(chain);

  const rpcs = useMemo(() => {
    if (!defaultRpc) {
      return chain.rpc;
    }
    if (chain.rpc.includes(defaultRpc)) {
      return chain.rpc;
    }
    return [
      defaultRpc,
      ...chain.rpc,
    ]
  }, [defaultRpc, chain]);

  const data = useRpcListQuery(rpcs);

  const rows = useMemo(() => {
    return data
      .map((query, i) => {
        const url = chain.rpc[i];
        return {
          id: url,
          isDefault: url === defaultRpc,
          query,
        };
      })
      .sort((a, b) => {
        const aStatus = getStatusWeight(a.query);
        const bStatus = getStatusWeight(b.query);
        if (aStatus !== bStatus) {
          return bStatus - aStatus;
        }

        if (!a.query.isSuccess) {
          return 0;
        }

        const aBlock = a.query.data!.block;
        const bBlock = b.query.data!.block;
        if (aBlock !== bBlock) {
          return bBlock - aBlock;
        }

        const aLatency = a.query.data!.latency;
        const bLatency = b.query.data!.latency;
        return aLatency - bLatency;
      })
  }, [chain, data]);

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
      />
    </Box>
  );
}

const queryClient = new QueryClient();
export const RpcList: React.FC<Chain> = (chain: Chain) => {
  return (
    <ModalCtxProvider>
      <QueryClientProvider client={queryClient}>
        <RpcListCore {...chain} />
      </QueryClientProvider >
    </ModalCtxProvider>
  )
}

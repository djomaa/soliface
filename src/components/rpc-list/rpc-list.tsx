import React, { useMemo } from 'react'

import Box from '@mui/material/Box'
import { DataGrid } from '@mui/x-data-grid'

import { DepcrecatedChainType } from 'types/chain'
import { useLogger } from 'hooks/use-logger'
import { useDefaultRpc } from 'hooks/use-default-rpc'

import { useRpcListQuery } from './query'
import { useRpcListColumns } from './rpc-list.columns'
import { getStatusWeight } from './rpc-list.utils'

export const RpcList: React.FC<DepcrecatedChainType> = (chain: DepcrecatedChainType) => {
  const [, { logState }] = useLogger(RpcList)

  const columns = useRpcListColumns(chain)
  const [defaultRpc] = useDefaultRpc(chain.chainId)

  const rpcs = useMemo(() => {
    if (!defaultRpc) {
      return chain.rpc
    }
    if (chain.rpc.includes(defaultRpc)) {
      return chain.rpc
    }
    return [
      defaultRpc,
      ...chain.rpc
    ]
  }, [defaultRpc, chain])

  logState('rpcs', rpcs)

  const data = useRpcListQuery(rpcs)

  const rows = useMemo(() => {
    return data
      .map((query, i) => {
        const url = chain.rpc[i]
        return {
          id: url,
          isDefault: url === defaultRpc,
          query
        }
      })
      .sort((a, b) => {
        const aStatus = getStatusWeight(a.query)
        const bStatus = getStatusWeight(b.query)
        if (aStatus !== bStatus) {
          return bStatus - aStatus
        }

        if (!a.query.isSuccess) {
          return 0
        }

        const aBlock = a.query.data.block
        const bBlock = b.query.data!.block
        if (aBlock !== bBlock) {
          return bBlock - aBlock
        }

        const aLatency = a.query.data.latency
        const bLatency = b.query.data!.latency
        return aLatency - bLatency
      })
  }, [chain, data])

  return (
    <Box sx={{ height: '100%', width: '100%' }}>
      <DataGrid
        autoHeight
        rows={rows}
        columns={columns}
      />
    </Box>
  )
}

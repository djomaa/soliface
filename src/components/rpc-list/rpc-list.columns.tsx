import { UseQueryResult } from 'react-query'
import React, { useCallback, useMemo } from 'react'

import Skeleton from '@mui/material/Skeleton'
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { Chain } from 'types/chain'
import { useChainCtx } from 'contexts/chain'
import { useModalCtx } from 'contexts/modal'
import { useDefaultRpc } from 'hooks/use-default-rpc'
import { AddChainModal } from 'modals/add-chain.modal'

import { IData } from './query'
import { getStatusIcon, getStatusWeight } from './rpc-list.utils'

interface IRow {
  id: string
  query: UseQueryResult<IData>
}

export const useRpcListColumns = (chain: Chain) => {
  const chainCtx = useChainCtx.orEmpty()
  const modalCtx = useModalCtx()
  const [defaultRpc, setDefaultRpc] = useDefaultRpc(chain.chainId)

  const addChain = useCallback((chain: Chain, rpc: string) => {
    modalCtx.addModal(AddChainModal, { chain: { ...chain, rpc: [rpc] } })
  }, []);

  const columns = useMemo(() => {
    const ColumnsCore: GridColumns<IRow> = [
      {
        field: 'status',
        headerName: 'Status',
        align: 'center',
        headerAlign: 'center',
        valueGetter: (params) => {
          return getStatusWeight(params.row.query)
        },
        renderCell: (params) => {
          return getStatusIcon(params.row.query)
        }
      },
      {
        field: 'url',
        headerName: 'URL',
        headerAlign: 'center',
        flex: 1,
        valueGetter: (params) => {
          return params.row.id
        }
      },
      {
        field: 'block',
        headerName: 'Block',
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params) => {
          return params.row.query.data?.block
        },
        renderCell: (params) => {
          if (params.row.query.isLoading) {
            return <Skeleton variant="rectangular" width='80%' height='40%' />
          }
          if (params.row.query.isSuccess) {
            const value = params.colDef.valueGetter!(params)
            if (value) {
              return value
            }
          }
          return '-'
        }
      },
      {
        field: 'latency',
        headerName: 'Latency',
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params) => {
          return params.row.query.data?.latency
        },
        renderCell: (params) => {
          if (params.row.query.isLoading) {
            return <Skeleton variant="rectangular" width='80%' height='40%' />
          }
          if (params.row.query.isSuccess) {
            const oValue = params.colDef.valueGetter!(params) as number | undefined
            if (oValue) {
              const inSeconds = oValue / 1e3
              const formatedValue = inSeconds.toLocaleString(undefined, {
                maximumFractionDigits: 3
              })
              return `${formatedValue}s`
            }
          }
          return '-'
        }
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: (params) => {
          const { isSuccess } = params.row.query
          const isDefaultRpc = params.row.id === defaultRpc

          return [
            <GridActionsCellItem
              disabled={!isSuccess}
              icon={
                isDefaultRpc ? <RadioButtonCheckedIcon /> : <RadioButtonUncheckedIcon />
              }
              label="Set as defaul"
              className="textPrimary"
              onClick={() => {
                setDefaultRpc(params.row.id)
              }}
              color="inherit"
            />,
            // TODO: tooltip with disable reason
            <GridActionsCellItem
              disabled={!isSuccess || !chainCtx?.canAddChain}
              icon={<WalletIcon />}
              label="Add to wallet"
              className="textPrimary"
              onClick={() => { addChain(chain, params.row.id) }}
              color="inherit"
            />
          ]
        }
      }
    ]

    return ColumnsCore.map((column) => {
      return {
        ...column,
        disableColumnMenu: true,
        disableReorder: true
      }
    })
  }, [chain, defaultRpc, chainCtx?.canAddChain])

  return columns
}

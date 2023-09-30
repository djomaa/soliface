import { UseQueryResult } from 'react-query'
import React, { useCallback, useMemo } from 'react'

import Skeleton from '@mui/material/Skeleton'
import WalletIcon from '@mui/icons-material/AccountBalanceWallet'
import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import RadioButtonCheckedIcon from '@mui/icons-material/RadioButtonChecked'
import RadioButtonUncheckedIcon from '@mui/icons-material/RadioButtonUnchecked'

import { DepcrecatedChainType } from 'types/chain'
import { useDefaultRpc } from 'hooks/use-default-rpc'
import { useAddChainToWalletAction } from 'actions/add-chain-to-wallet'

import LaunchIcon from '@mui/icons-material/Launch';
import LanguageIcon from '@mui/icons-material/Language';
import SearchIcon from '@mui/icons-material/Search';
import { Chain } from 'contexts/db/schema/chain'
import FindInPage from '@mui/icons-material/FindInPage'
import { RxQueryResultJSON } from 'rxdb-hooks'
import { DeepReadonly } from 'rxdb/dist/types/types'
import Tooltip from '@mui/material/Tooltip'


export const useChainListColumns = () => {
  // const addChain = useCallback((chain: DepcrecatedChainType, rpc: string) => {
  //   addChainToWallet!({ ...chain, rpc: [rpc] })
  // }, []);

  const columns = useMemo(() => {
    const ColumnsCore: GridColumns<DeepReadonly<Chain.Doc>> = [
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: (params) => {

          return [
            <GridActionsCellItem
              icon={<Tooltip title='Open website'><LanguageIcon /></Tooltip>}
              label="Open website"
              className="textPrimary"
              // onClick={() => { addChain(chain, params.row.id) }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<Tooltip title='Open details'><LaunchIcon /></Tooltip>}
              label="Open details"
              onClick={() => {
                // setDefaultRpc(params.row.id)
              }}
              color="inherit"
            />,
          ]
        }
      },
      {
        field: 'chainId',
        headerName: 'Status',
        type: 'number',
        align: 'left',
        headerAlign: 'center',
      },
      {
        field: 'name',
        headerName: 'Name',
        sortable: false,
        flex: 1,
      },
      {
        field: 'api',
        headerName: 'API',
        sortable: false,
        type: 'boolean',
        valueGetter: ({ row }) => row.chainId && row.chainId % 2 === 1,
      },
      {
        field: 'rpc',
        headerName: 'RPC',
        sortable: false,
        type: 'boolean',
        valueGetter: ({ row }) => row.chainId && row.chainId % 2 === 1,
      },
    ]

    return ColumnsCore.map((column) => {
      return {
        ...column,
        disableColumnMenu: true,
        disableReorder: true
      }
    })
  }, [])

  return columns
}

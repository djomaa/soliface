import Web3 from 'web3'
import React, { useMemo } from 'react'

import { DataGrid, GridColDef } from '@mui/x-data-grid'

import { AbiItem, AbiOutput } from 'types/abi'
import { safe } from 'helpers/safe'
import { parseError } from 'utils/error'
import { Typography } from '@mui/material'

const DataGridColumns: GridColDef[] = [
  {
    field: 'path',
    headerName: 'Index'
  },
  {
    field: 'type',
    headerName: 'Type'
  },
  {
    field: 'name',
    headerName: 'Name'
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1
    // valueGetter: (p) => {
    //   p.value = <TextField disabled>{p.value}</TextField>
    // }
  }
]

interface iOut {
  name: string
  type: string
  path: number[]
}

interface iOutWithValue extends iOut {
  id: number
  value: string
}

function parseOutput(item: AbiOutput, path: number[]): iOut[] {
  if (item.components != null) {
    return item.components.map((cItem, i) => {
      return parseOutput(cItem, [...path, i])
    }).flat()
  }

  const out = {
    name: item.name,
    type: item.type,
    path
  }
  return [out]
}

interface iProps {
  raw: string
  abi: AbiItem
  web3: Web3
}

export const MethodDecodedResult: React.FC<iProps> = ({ raw, abi, web3 }) => {
  if (!abi.outputs || !abi.outputs.length) {
    return <></>
  }

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const decoded = useMemo(() => {
    const [value, error] = safe(() => web3.eth.abi.decodeParameters(abi.outputs!, raw));
    return error ?? value;
  }, [abi, raw]);

  if (!decoded) {
    return <>Empty</>
  }
  if (decoded instanceof Error) {
    const fError = parseError(decoded);
    return (
      <>
        <Typography variant='body1'>Failed to decode</Typography>
        <Typography variant='body2'>{fError.body}</Typography>
      </>
    )
  }

  // const decoded = web3.eth.abi.decodeParameters(abi.outputs, raw)
  const items = abi.outputs
    .map((output, i) => parseOutput(output, [i]))
    .flat()
    .map<iOutWithValue>((out, id) => {
      const value = out.path.reduce((obj, key) => {
        return obj[key]
      }, decoded)
      return {
        ...out,
        // TODO: type cast?
        name: out.name ?? '-',
        id,
        value: value as unknown as string
      }
    })

  return (
    <DataGrid
      autoHeight
      hideFooter
      columns={DataGridColumns}
      rows={items}
    />
  )
}

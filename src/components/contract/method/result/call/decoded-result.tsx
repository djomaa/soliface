import Web3 from 'web3';
import React from 'react'
import { Alert, AlertTitle, TextField } from '@mui/material';
import { DataGrid, GridColDef } from '@mui/x-data-grid';
import { AbiItem, AbiOutput } from 'types/abi';

const DataGridColumns: GridColDef[] = [
  {
    field: 'path',
    headerName: 'Index',
  },
  {
    field: 'type',
    headerName: 'Type',
  },
  {
    field: 'name',
    headerName: 'Name',
  },
  {
    field: 'value',
    headerName: 'Value',
    flex: 1,
    // valueGetter: (p) => {
    //   p.value = <TextField disabled>{p.value}</TextField>
    // }
  },
]

interface iOut {
  name: string;
  type: string;
  path: number[];
}

interface iOutWithValue extends iOut {
  id: number;
  value: string;
}

function parseOutput(item: AbiOutput, path: number[]): iOut[] {
  if (item.components) {
    return item.components.map((cItem, i) => {
      return parseOutput(cItem, [...path, i]);
    }).flat();
  }
  
  const out = {
    name: item.name,
    type: item.type,
    path: path,
  }
  return [out];
}

interface iProps {
  raw: string;
  abi: AbiItem;
  web3: Web3;
}

export const MethodDecodedResult: React.FC<iProps> = ({ raw, abi, web3 }) => {
  if (!abi.outputs || !abi.outputs.length) {
    return <></>
  };
  // TODO: handle decode failure
  const decoded = web3.eth.abi.decodeParameters(abi.outputs, raw);
  const items = abi.outputs
    .map((output, i) => parseOutput(output, [i]))
    .flat()
    .map<iOutWithValue>((out, id) => {
      const value = out.path.reduce((obj, key) => {
        return obj[key];
      }, decoded);
      return {
        ...out,
        // TODO: type cast?
        name: out.name ?? '-',
        id,
        value: value as unknown as string,
      }
    });

  return (
    <DataGrid
      autoHeight
      hideFooter
      columns={DataGridColumns}
      rows={items}
    />
  )
}

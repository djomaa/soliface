import React, { useMemo } from 'react'

import { GridActionsCellItem, GridColumns } from '@mui/x-data-grid'
import CheckBoxCheckedIcon from '@mui/icons-material/CheckBoxOutlined';
import EditIcon from '@mui/icons-material/Edit'
import DeleteIcon from '@mui/icons-material/DeleteOutlined'
import { IArtifactInfo } from 'hooks/use-artifact'

export interface IRow {
  id: string
  artifact: IArtifactInfo;
}

export const useAbiListColumns = () => {

  const columns = useMemo(() => {
    const ColumnsCore: GridColumns<IRow> = [
      {
        field: 'hash',
        headerName: 'Hash',
        valueGetter: (params) => {
          return params.row.artifact.hash;
        },
      },
      {
        field: 'name',
        headerName: 'Name',
        editable: true,
        flex: 1,
        valueGetter: (params) => {
          return params.row.artifact.name;
        },
      },
      {
        field: 'isDefault',
        headerName: 'Default',
        headerAlign: 'center',
        align: 'center',
        valueGetter: (params) => {
          return !!params.row.artifact.isDefault;
        },
        renderCell: (params) => {
          if (params.row.artifact.isDefault) {
            return <CheckBoxCheckedIcon />
          }
          return <></>
        }
      },
      {
        field: 'actions',
        type: 'actions',
        headerName: 'Actions',
        width: 100,
        cellClassName: 'actions',
        getActions: ({ id }) => {
          return [
            <GridActionsCellItem
              icon={<EditIcon />}
              label="Edit"
              className="textPrimary"
              // onClick={() => { editArtifact(id) }}
              color="inherit"
            />,
            <GridActionsCellItem
              icon={<DeleteIcon />}
              label="Delete"
            // onClick={() => { deleteArtifacts([id]) }}
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
  }, [])

  return columns
}

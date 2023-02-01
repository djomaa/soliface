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

interface IProps {
  editArtifact: (hash: string) => void;
  removeArtifact: (hash: string) => void;
}
export const useAbiListColumns = (props: IProps) => {

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
        getActions: (params) => {
          const { hash, isDefault } = params.row.artifact;
          if (isDefault) {
            <GridActionsCellItem
              //#endregion
              label='Default'
              icon={<EditIcon />}
            // <Chip label="Chip Filled" />
            />
          }
          return [
            <GridActionsCellItem
              label="Edit"
              color="inherit"
              icon={<EditIcon />}
              disabled={isDefault}
              className="textPrimary"
              onClick={() => { props.editArtifact(hash) }}
            />,
            <GridActionsCellItem
              label="Delete"
              disabled={isDefault}
              icon={<DeleteIcon />}
              onClick={() => { props.removeArtifact(hash) }}
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

import React, { useCallback, useMemo, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import Container from '@mui/system/Container'
import EditIcon from '@mui/icons-material/Edit'
import Typography from '@mui/material/Typography'
import DeleteIcon from '@mui/icons-material/Delete'
import ExportIcon from '@mui/icons-material/FileUpload'
import ImportIcon from '@mui/icons-material/FileDownload'
import DeleteOutlinedIcon from '@mui/icons-material/DeleteOutlined'
import {
  DataGrid,
  GridActionsCellItem,
  GridColumns,
  GridRowId,
  GridSelectionModel
} from '@mui/x-data-grid'

import { Artifact } from 'helpers/abi'
import { useLogger } from 'hooks/use-logger'
import { useArtifactStore } from 'hooks/use-artifact-store'

import { AddArtifactDialog } from './add'
import { EditArtifactDialog } from './edit'

interface IRow {
  id: GridRowId
  name: string
  hash: string
}

interface ToolbarProps {
  add: Function
  remove: Function
  toggleRemoving: (v: boolean) => void
}
const ToolBar: React.FC<ToolbarProps> = (props) => {
  const [isRemoving, setRemoving] = useState(false)

  const toggleRemoving = (isActive: boolean) => {
    setRemoving(isActive)
    props.toggleRemoving(isActive)
  }

  if (isRemoving) {
    return (
      <Box>
        <Button onClick={() => props.remove(true)}>
          Delete
        </Button>
        <Button onClick={() => { toggleRemoving(false) }}>
          Cancel
        </Button>
      </Box>
    )
  }

  return (
    <Box>
      <Stack
        direction='row'
        justifyContent='space-evenly'
        divider={<Divider orientation="vertical" variant='middle' flexItem />}
      >
        <Button
          startIcon={<AddIcon />}
          onClick={() => props.add()}
        >
          Add
        </Button>
        <Button
          startIcon={<DeleteIcon />}
          onClick={() => { toggleRemoving(true) }}
        >
          Remove
        </Button>
        <Tooltip title='Not implemented yet'>
          <Button
            startIcon={<ImportIcon />}
          >
            Import
          </Button>
        </Tooltip>
        <Tooltip title='Not implemented yet'>
          <Button
            // disabled
            startIcon={<ExportIcon />}
          >
            Export
          </Button>
        </Tooltip>
      </Stack>
      <Divider />
    </Box>
  )
}

export const AbiManager: React.FC = () => {
  const [logger, { logState }] = useLogger(AbiManager)

  const [cur, setCur] = useState<Artifact>()
  const [isAddOpen, setAddOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isSelection, setSelection] = useState(false)
  const artifacts = useArtifactStore()
  const items = useMemo<IRow[]>(() => {
    return artifacts.list.map((artifact) => {
      return { id: artifact.hash, name: artifact.name, hash: artifact.hash }
    })
  }, [artifacts.list])
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  logState('selectionModel changed', selectionModel)

  const findOrFail = (id: GridRowId) => {
    if (typeof id === 'number') {
      throw new Error('')
    }
    const artifact = artifacts.list.find((a) => a.hash === id)
    if (artifact == null) {
      // sLogger.warn('Artifact cannot be removed: artifact not found by row id');
      throw new Error(`${AbiManager.name}: findOrFail: artifact not found`)
    }
    return artifact
  }

  const deleteArtifacts = useCallback((ids: GridSelectionModel) => {
    const sLogger = logger.sub('deleteArtifacts')
    sLogger.debug('Started')
    for (const id of ids) {
      const artifact = findOrFail(id)
      artifacts.remove(artifact)
    }
    sLogger.debug('Done')
  }, [artifacts.list])

  const editArtifact = useCallback((id: IRow['id']) => {
    const sLogger = logger.sub('editArtifact')
    sLogger.debug('Edit', id)
    const artifact = findOrFail(id)
    setCur(artifact)
    setEditOpen(true)
  }, [])

  const Columns: GridColumns = [
    {
      field: 'hash',
      headerName: 'Hash'
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      flex: 1
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
            onClick={() => { editArtifact(id) }}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteOutlinedIcon />}
            label="Delete"
            onClick={() => { deleteArtifacts([id]) }}
          />
        ]
      }
    }
  ]

  return (
    <Container>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        ABI Manager
      </Typography>
      <AddArtifactDialog
        open={isAddOpen}
        artifact={cur}
        close={() => { setAddOpen(false) }}
      />
      <EditArtifactDialog
        open={isEditOpen}
        artifact={cur}
        close={() => { setEditOpen(false) }}
      />
      <DataGrid
        autoHeight={true}
        hideFooter
        rows={items}
        columns={Columns}
        checkboxSelection={isSelection}
        components={{
          Toolbar: ToolBar
        }}
        componentsProps={{
          toolbar: {
            add: () => { setAddOpen(true) },
            toggleRemoving: (v: boolean) => { setSelection(v) },
            remove: () => { deleteArtifacts(selectionModel) }
          } as ToolbarProps
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel)
        }}
      />
    </Container>
  )
}

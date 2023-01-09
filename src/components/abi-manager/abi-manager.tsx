import { Box, Button, Divider, IconButton, Typography } from '@mui/material'
import { Container } from '@mui/system'
import { DataGrid, GridActionsCellItem, GridCellEditCommitParams, GridCellEditStopParams, GridColDef, GridColumns, GridRowId, GridSelectionModel } from '@mui/x-data-grid'
import { useArtifactCtx } from 'contexts/artifact'
import React, { useCallback, useEffect, useMemo, useState } from 'react'
import AddIcon from '@mui/icons-material/Add';
import { AddArtifactDialog } from './add'
import { useLogger } from 'hooks/use-logger'
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/DeleteOutlined';
import { Artifact } from 'helpers/abi'
import { EditArtifactDialog } from './edit'
interface IRow {
  id: GridRowId;
  name: string;
  hash: string;
}

interface ToolbarProps {
  add: Function;
  remove: Function;
  toggleRemoving: (v: boolean) => void;
}
const ToolBar: React.FC<ToolbarProps> = (props) => {
  const [isRemoving, setRemoving] = useState(false);

  const toggleRemoving = (isActive: boolean) => {
    setRemoving(isActive);
    props.toggleRemoving(isActive);
  }

  if (isRemoving) {
    return (
      <Box>
        <Button onClick={() => props.remove(true)}>
          Delete
        </Button>
        <Button onClick={() => toggleRemoving(false)}>
          Cancel
        </Button>
      </Box>
    );
  }

  return (
    <Box>
      <Button onClick={() => props.add()}>
        Add
      </Button>
      <Button onClick={() => toggleRemoving(true)}>
        Remove
      </Button>

      <Divider />
    </Box>
  )
}

export const AbiManager: React.FC = () => {
  const [logger, { logState }] = useLogger(AbiManager);
  const [cur, setCur] = useState<Artifact>();
  const [isAddOpen, setAddOpen] = useState(false);
  const [isEditOpen, setEditOpen] = useState(false);
  const [isSelection, setSelection] = useState(false);
  const { artifacts, removeArtifact, saveArtifact } = useArtifactCtx();
  const items = useMemo<IRow[]>(() => {
    return artifacts.map((artifact) => {
      return { id: artifact.hash, name: artifact.name, hash: artifact.hash };
    })
  }, [artifacts]);
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([]);

  logState('selectionModel changed', selectionModel);

  const findOrFail = (id: GridRowId) => {
    if (typeof id == 'number') {
      throw new Error('')
    }
    const artifact = artifacts.find((a) => a.hash === id);
    if (!artifact) {
      // sLogger.warn('Artifact cannot be removed: artifact not found by row id');
      throw new Error(`${AbiManager.name}: findOrFail: artifact not found`);
    }
    return artifact;
  }

  const deleteArtifacts = useCallback((ids: GridSelectionModel) => {
    const sLogger = logger.sub('deleteArtifacts');
    sLogger.debug('Started');
    for (const id of ids) {
      const artifact = findOrFail(id);
      removeArtifact(artifact);
    }
    sLogger.debug('Done');
  }, [removeArtifact, artifacts]);

  const editArtifact = useCallback((id: IRow['id']) => {
    const sLogger = logger.sub('editArtifact');
    sLogger.debug('Edit', id);
    const artifact = findOrFail(id);
    setCur(artifact);
    setEditOpen(true);
  }, [])


  const Columns: GridColumns = [
    {
      field: 'hash',
      headerName: 'Hash',
    },
    {
      field: 'name',
      headerName: 'Name',
      editable: true,
      flex: 1,
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
            onClick={() => editArtifact(id)}
            color="inherit"
          />,
          <GridActionsCellItem
            icon={<DeleteIcon />}
            label="Delete"
            onClick={() => deleteArtifacts([id])}
          />,
        ];
      },
    }
  ]

  return (
    // <Box sx={{ height: '95vh' }}>
    <Container sx={{ height: '95vh' }}>
      <Typography variant='h5'>
        ABI Manager
      </Typography>
      <Divider />
      <AddArtifactDialog
        open={isAddOpen}
        artifact={cur}
        close={() => setAddOpen(false)}
      />
      <EditArtifactDialog
        open={isEditOpen}
        artifact={cur}
        close={() => setEditOpen(false)}
      />
      <DataGrid
        autoHeight={false}
        hideFooter
        rows={items}
        columns={Columns}
        checkboxSelection={isSelection}
        components={{
          Toolbar: ToolBar,
        }}
        componentsProps={{
          toolbar: {
            add: () => setAddOpen(true),
            toggleRemoving: (v: boolean) => setSelection(v),
            remove: () => deleteArtifacts(selectionModel),
          } as ToolbarProps
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel);
        }}
      />
    </Container>
    // </Box>
  )


}

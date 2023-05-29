import assert from 'assert'
import { useNavigate } from 'react-router-dom'
import React, { useCallback, useMemo, useState } from 'react'

import {
  DataGrid,
  GridSelectionModel
} from '@mui/x-data-grid'

import { createRoute, Route } from 'constants/route'

import { useArtifactList } from 'hooks/use-artifact'
import { ArtifactListToolBar } from './artifact-list.toolbar'
import { IRow, useArtifactListColumns } from './artifact-list.columns'
import { useArtifactRemoveAction } from 'hooks/use-artifact/use-artifact-remove.action'

export const ArtifactList: React.FC = () => {
  const [isSelection, setSelection] = useState(false)

  const navigate = useNavigate();
  const { artifactList } = useArtifactList();
  const { removeArtifact } = useArtifactRemoveAction();

  const editArtifact = useCallback((hash: string) => {
    const route = createRoute[Route.EditArtifact](hash);
    navigate(route);
  }, []);

  const columns = useArtifactListColumns({ removeArtifact, editArtifact })

  const items = useMemo<IRow[]>(() => {
    return artifactList.map((artifact) => {
      return { id: artifact.hash, artifact }
    })
  }, [artifactList])
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  const removeArtifacts = useCallback((ids: GridSelectionModel) => {
    for (const id of ids) {
      assert(typeof id === 'string');
      removeArtifact(id);
    }
  }, []);


  return (
    <>
      <DataGrid
        autoHeight={true}
        hideFooter
        rows={items}
        columns={columns}
        checkboxSelection={isSelection}
        components={{
          Toolbar: ArtifactListToolBar
        }}
        componentsProps={{
          toolbar: {
            add: () => { navigate(Route.CreateArtifact) },
            toggleRemoving: setSelection,
            remove: () => { removeArtifacts(selectionModel) }
          }
        }}
        experimentalFeatures={{ newEditingApi: true }}
        onSelectionModelChange={(newSelectionModel) => {
          setSelectionModel(newSelectionModel)
        }}
        isCellEditable={(params) => {
          return !params.row.artifact.isDefault;
        }}
        isRowSelectable={(params) => {
          return !params.row.artifact.isDefault;
        }}
      />
    </>
  )
}

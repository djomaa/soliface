import React, { useCallback, useMemo, useState } from 'react'

import {
  DataGrid,
  GridSelectionModel
} from '@mui/x-data-grid'

import { Artifact } from 'helpers/abi/artifact'
import { useLogger } from 'hooks/use-logger'

import { useArtifactList } from 'hooks/use-artifact'
import { IRow, useAbiListColumns } from './abi-list.columns'
import { AbiListToolBar } from './abi-list.toolbar'
import { useNavigate } from 'react-router-dom'
import { Route } from 'constants/route'

export const AbiList: React.FC = () => {
  const navigate = useNavigate();
  const [logger, { logState }] = useLogger(AbiList)

  const [cur, setCur] = useState<Artifact>()
  const [isAddOpen, setAddOpen] = useState(false)
  const [isEditOpen, setEditOpen] = useState(false)
  const [isSelection, setSelection] = useState(false)
  const { artifactList, removeArtifact } = useArtifactList();

  const columns = useAbiListColumns()

  const items = useMemo<IRow[]>(() => {
    return artifactList.map((artifact) => {
      return { id: artifact.hash, artifact }
    })
  }, [artifactList])
  const [selectionModel, setSelectionModel] = React.useState<GridSelectionModel>([])

  logState('selectionModel changed', selectionModel)

  // const findOrFail = (id: GridRowId) => {
  //   if (typeof id === 'number') {
  //     throw new Error('')
  //   }
  //   const artifact = artifacts.list.find((a) => a.hash === id)
  //   if (artifact == null) {
  //     // sLogger.warn('Artifact cannot be removed: artifact not found by row id');
  //     throw new Error(`${AbiManager.name}: findOrFail: artifact not found`)
  //   }
  //   return artifact
  // }

  const removeArtifacts = useCallback((ids: GridSelectionModel) => {
    for (const id of ids) {
      if (typeof id === 'number') {
        // safety check *
        throw new Error(`typeof id === 'number'`);
      }
      removeArtifact(id);
    }
  }, [])

  // const editArtifact = useCallback((id: IRow['id']) => {
  //   const sLogger = logger.sub('editArtifact')
  //   sLogger.debug('Edit', id)
  //   const artifact = findOrFail(id)
  //   setCur(artifact)
  //   setEditOpen(true)
  // }, [])

  return (
    <>
      {/* <EditArtifactDialog
        open={isEditOpen}
        artifact={cur}
        close={() => { setEditOpen(false) }}
      /> */}
      <DataGrid
        autoHeight={true}
        hideFooter
        rows={items}
        columns={columns}
        checkboxSelection={isSelection}
        components={{
          Toolbar: AbiListToolBar
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

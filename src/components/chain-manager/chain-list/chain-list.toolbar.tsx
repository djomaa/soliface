import React from 'react'
import { GridToolbarColumnsButton, GridToolbarContainer, GridToolbarContainerProps, GridToolbarDensitySelector, GridToolbarFilterButton, GridToolbarQuickFilter } from '@mui/x-data-grid/components'
import Button from '@mui/material/Button'
import Stack from '@mui/material/Stack'
import SyncIcon from '@mui/icons-material/Sync';
import { useGridApiContext } from '@mui/x-data-grid';
import { SyncChainsModal } from '../sync-chains';
import { modal } from 'libs/modals';

interface IProps {
}
export const ChainListToolbar: React.FC<GridToolbarContainerProps> = (props) => {
  const ctx = useGridApiContext();


  return (
    <GridToolbarContainer sx={{ display: 'flex' }}>
      <Stack direction='row' justifyContent='space-between' width='100%'>
        <Stack direction='row' gap={1}>
          <Button
            variant='outlined'
            startIcon={<SyncIcon />}
            size='small'
            onClick={() => modal.show(SyncChainsModal, {})}
          >
            Synchronize
          </Button>
          <GridToolbarDensitySelector />
        </Stack>
        <GridToolbarQuickFilter
          size='small'
        // value={search}
        // onChange={(e) => setSearch(e.target.value)}
        // onChange={(e) => {
        //   ctx.current.setQuickFilterValues([e.target.value])
        //   // ctx.current.unstable_applyFilters();
        // }}
        />
      </Stack>
    </GridToolbarContainer>
  )
}

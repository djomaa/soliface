import React, { SetStateAction, useState } from 'react'

import Box from '@mui/material/Box'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExportIcon from '@mui/icons-material/FileUpload'
import ImportIcon from '@mui/icons-material/FileDownload'
import Grid from '@mui/material/Unstable_Grid2/Grid2'


export interface IAbiListToolbarProps {
  add: () => void;
  toggleRemoving: React.Dispatch<SetStateAction<boolean>>;
  remove: () => void;
}

export const AbiListToolBar: React.FC<IAbiListToolbarProps> = (props) => {
  const [isRemoving, setRemoving] = useState(false)

  const toggleRemoving = (isActive: boolean) => {
    setRemoving(isActive)
    props.toggleRemoving(isActive)
  }

  if (isRemoving) {
    return (
      <Box>
        <Button
          onClick={() => props.remove()}
        >
          Delete
        </Button>
        <Button
          onClick={() => { toggleRemoving(false) }}
        >
          Cancel
        </Button>
      </Box>
    )
  }

  const xs = 12;
  const md = 3;
  return (
    <Box>
      <Grid container textAlign='center'>
        <Grid xs={xs} md={md}>
          <Button
            startIcon={<AddIcon />}
            onClick={() => props.add()}
          >
            Add
          </Button>
        </Grid>
        <Grid xs={xs} md={md}>

          <Button
            startIcon={<DeleteIcon />}
            onClick={() => { toggleRemoving(true) }}
          >
            Remove
          </Button>
        </Grid>
        <Grid xs={xs} md={md}>
          <Tooltip title='Not implemented yet'>
            <Button
              startIcon={<ImportIcon />}
            >
              Import
            </Button>
          </Tooltip>
        </Grid>
        <Grid xs={xs} md={md}>
          <Tooltip title='Not implemented yet'>
            <Button
              // disabled
              startIcon={<ExportIcon />}
            >
              Export
            </Button>
          </Tooltip>
        </Grid>
      </Grid>
      <Divider />
    </Box >
  )
}

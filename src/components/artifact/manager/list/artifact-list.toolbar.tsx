import React, { SetStateAction, useState } from 'react'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import Divider from '@mui/material/Divider'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import WarningIcon from '@mui/icons-material/Warning'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import ExportIcon from '@mui/icons-material/FileUpload'
import ImportIcon from '@mui/icons-material/FileDownload'
import Button from '@mui/material/Button'

export const Gridded: React.FC<{ children: React.ReactNode[] }> = ({ children }) => {
  const xs = 12;
  const md = 12 / children.length;
  return (
    <Grid container textAlign='center'>
      {children.map((node) => {
        return (
          <Grid xs={xs} md={md}>
            {node}
          </Grid>
        );
      })}
    </Grid>
  );
}

export interface IArtifactListToolbarProps {
  add: () => void;
  toggleRemoving: React.Dispatch<SetStateAction<boolean>>;
  remove: () => void;
}

export const ArtifactListToolBar: React.FC<IArtifactListToolbarProps> = (props) => {
  const [isRemoving, setRemoving] = useState(false)

  const toggleRemoving = (isActive: boolean) => {
    setRemoving(isActive)
    props.toggleRemoving(isActive)
  }

  if (isRemoving) {
    return (
      <Gridded>
        <Button
          onClick={() => { toggleRemoving(false) }}
        >
          Cancel
        </Button>
        <Button
          color='error'
          startIcon={<WarningIcon />}
          onClick={() => props.remove()}
        >
          Delete
        </Button>
      </Gridded>
    )
  }

  return (
    <Box>
      <Gridded>
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
            startIcon={<ExportIcon />}
          >
            Export
          </Button>
        </Tooltip>
      </Gridded>
      <Divider />
    </Box>
  )
}

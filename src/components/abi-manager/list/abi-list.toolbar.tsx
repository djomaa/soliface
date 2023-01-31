import React, { SetStateAction, useState } from 'react'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Divider from '@mui/material/Divider'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import DeleteIcon from '@mui/icons-material/Delete'
import ExportIcon from '@mui/icons-material/FileUpload'
import ImportIcon from '@mui/icons-material/FileDownload'


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
          onClick={() => { props.toggleRemoving(true) }}
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

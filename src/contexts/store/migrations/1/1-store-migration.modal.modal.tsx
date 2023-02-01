import React, { useMemo } from 'react'

import Button from '@mui/material/Button'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import DialogActions from '@mui/material/DialogActions'
import DialogContentText from '@mui/material/DialogContentText'

import { AsyncModal } from 'libs/modals'
import { Dialog } from 'modals/base/base.dialog'
import { FormattedError } from 'utils/error/formatted'

interface IProps {
  name: string;
  rawAbi?: string;
  error: Error;
}

// export const StoreMigration1Modal: AsyncModal<void, IProps> = ({ error, rawAbi, name, ...props }) => {
export const StoreMigration1Modal: AsyncModal<void, IProps> = ({ error, rawAbi, name, ...props }) => {

  const file = useMemo(() => {
    if (!rawAbi) {
      return;
    }
    const blob = new Blob([rawAbi], { type: "application/json" });
    return {
      name: `corruped-artifact_${name}.json`,
      content: URL.createObjectURL(blob),
    }
  }, [name, rawAbi]);

  return (
    <Dialog
      onClose={() => props.onClose()}
    >
      <DialogTitle>Failed to migrate old artifact</DialogTitle>
      <DialogContent>
        <DialogContentText>
          {file
            ? <Typography variant='body1'>Copy and save your artifact JSON and recreate in manually.</Typography>
            : <Typography variant='body1'>ABI is empty, so it cannot be downloaded</Typography>
          }
          <Typography>Artifact name: {name}</Typography>
          <FormattedError error={error} />
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        {file && (
          <Button
            LinkComponent={'a'}
            href={file.content}
            download={file.name}
          >
            Download
          </Button>
        )}
        <Button
          onClick={() => props.onClose()}
        >
          Continue
        </Button>
      </DialogActions>
    </Dialog >
  )
}

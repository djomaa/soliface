import React, { useEffect, useMemo } from 'react'

import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { useLogger } from 'hooks/use-logger'
import { useContractCtx } from 'contexts/contract'
import { useArtifactList } from 'hooks/use-artifact'

export const ArtifactSelector: React.FC = () => {
  const [, { logState }] = useLogger(ArtifactSelector)

  const contractCtx = useContractCtx()
  const { artifactList } = useArtifactList();

  // TODO:! remove, only for developing
  useEffect(() => {
    if (artifactList[1]) {
      contractCtx.setArtifactHash(artifactList[1].hash);
    }
  }, [artifactList])

  const artifactOptions = useMemo(() => {
    return artifactList.map((abi) => {
      return (
        <MenuItem
          key={abi.hash}
          value={abi.hash}
        >
          {abi.name}
        </MenuItem>
      )
    })
  }, [artifactList])

  const handleChange = (value: string) => {
    const newArtifact = artifactList.find((abi) => abi.hash === value)
    if (newArtifact == null) {
      throw new Error('Unexpected error: cannot find artifact by hash')
    }
    contractCtx.setArtifactHash(newArtifact.hash)
  }

  return (
    <>
      <Stack direction="row">
        <TextField
          select
          label="ABI"
          fullWidth
          margin='dense'
          value={contractCtx.artifactHash ?? ''}
          onChange={(e) => {
            handleChange(e.target.value)
          }}
        >
          {artifactOptions}
        </TextField>
      </Stack>
    </>
  )
}

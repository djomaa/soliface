import React, { useEffect, useMemo } from 'react'

import Stack from '@mui/material/Stack'
import MenuItem from '@mui/material/MenuItem'
import TextField from '@mui/material/TextField'

import { useLogger } from 'hooks/use-logger'
import { useContractCtx } from 'contexts/contract'
import { useArtifactList } from 'hooks/use-artifact'
import { toast } from 'react-toastify'

export const ArtifactSelector: React.FC = () => {
  const [Logger] = useLogger(ArtifactSelector)

  const contractCtx = useContractCtx()
  const { artifactList } = useArtifactList();

  useEffect(() => {
    const logger = Logger.sub('useEffect([contractCtx.artifactHash, artifactList])');
    if (!contractCtx.artifactHash) {
      return;
    }
    const doesExist = artifactList.some((artifact) => artifact.hash === contractCtx.artifactHash);
    if (!doesExist) {
      logger.debug('Artifact hash not found, clearing');
      toast.error('Artifact matching stored artifact hash not found');
      contractCtx.setArtifactHash(undefined);
    }
  }, [contractCtx.artifactHash, artifactList]);

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
    const logger = Logger.sub('handleChange');
    logger.debug('Chaning to', { value });
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

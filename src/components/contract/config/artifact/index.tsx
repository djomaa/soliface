import React, { useMemo } from 'react';

import Stack from '@mui/material/Stack';
import MenuItem from '@mui/material/MenuItem';
import TextField from '@mui/material/TextField';

import { useLogger } from 'hooks/use-logger';
import { useContractCtx } from 'contexts/contract';
import { useArtifactCtx } from 'contexts/artifact';

export const ArtifactSelector: React.FC = () => {
  const [, { logState }] = useLogger(ArtifactSelector);

  const ctx = useContractCtx();
  const { artifacts } = useArtifactCtx();

  const artifactOptions = useMemo(() => {
    return artifacts.map((abi) => {
      return (
        <MenuItem
          key={abi.hash}
          value={abi.hash}
        >
          {abi.name}
        </MenuItem>
      );
    });
  }, [artifacts]);

  logState('artifactOptions', artifactOptions);

  const handleChange = (value: string) => {
    const newArtifact = artifacts.find((abi) => abi.hash === value);
    if (!newArtifact) {
      throw new Error('Unexpected error: cannot find artifact by hash');
    }
    ctx.setArtifact(newArtifact);
  }

  return (
    <>
      <Stack direction="row">
        <TextField
          select
          label="ABI"
          fullWidth
          margin='dense'
          value={ctx.artifact?.hash ?? ''}
          onChange={(e) => {
            return handleChange(e.target.value);
          }}
        >
          {artifactOptions}
        </TextField>
      </Stack>
    </>
  );
}

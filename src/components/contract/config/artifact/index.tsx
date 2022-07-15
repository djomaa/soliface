import React, { useEffect, useMemo, useState } from 'react';
import { Button, IconButton, InputAdornment, MenuItem, Stack, TextField } from '@mui/material';
import { useContractCtx } from 'contexts/contract';
import { VisibilityOff, Visibility, Add } from '@mui/icons-material';
import { AddArtifactDialog } from './add';
import { useArtifactStore } from 'hooks/use-artifact-store';
import { useLogger } from 'hooks/use-logger';
import { useArtifactCtx } from 'contexts/artifact';

export const ArtifactSelector: React.FC = () => {

  const [, { logState }] = useLogger(ArtifactSelector);
  const ctx = useContractCtx();
  const [open, setOpen] = useState(false);
  // const [artifacts] = useArtifactStore();
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
      <AddArtifactDialog
        open={open}
        close={() => setOpen(false)}
      />
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
        <Button
        onClick={() => setOpen(true)}
        // onMouseDown={handleMouseDownPassword}
        >
          <Add />
        </Button>
      </Stack>
    </>
  );
}

import React, { useMemo, useRef, useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField, BottomNavigation, BottomNavigationAction, Divider, Alert, AlertTitle, Link } from '@mui/material';
import { GetArtifactError, Artifact, safeDecodeAndValidateAbi } from 'helpers/abi';
import { useArtifactStore } from 'hooks/use-artifact-store';
import { useContractCtx } from 'contexts/contract';
import { SafeError } from 'types/common';
import { useArtifactCtx } from 'contexts/artifact';

import ArrowUpwardIcon from '@mui/icons-material/ArrowUpward';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { positions } from '@mui/system';
// TODO: make always on top button save (and name input);
interface iProps {
  open: boolean;
  close: () => void;
  artifact: Artifact | undefined;
}

export const AddArtifactDialog: React.FC<iProps> = (props) => {
  console.log("🚀 ~ file: add.tsx:20 ~ props", props.artifact)
  const { close, open } = props;
  const [name, setName] = useState(props.artifact?.name ?? '');
  const [abiStr, setAbiStr] = useState(props.artifact?.abi ? JSON.stringify(props.artifact?.abi, null, 2) : '');
  const [error, setError] = useState<SafeError>();
  const { addArtifact, removeArtifact } = useArtifactCtx();
  const { setArtifact } = useContractCtx();
  const nameInputRef = useRef<HTMLElement>(null);
  const abiInputRef = useRef<HTMLInputElement>(null);

  const decodedAbi = useMemo(() => {
    if (!abiStr) {
      return undefined;
    }
    const [value, error] = safeDecodeAndValidateAbi(abiStr);
    if (error) {
      setError(error);
      return undefined;
    }
    setError(error);
    return value;
  }, [abiStr]);

  const createArtifact = () => {

    if (!abiStr) {
      setError({ message: 'Enter ABI' });
      return;
    }
    if (!decodedAbi) {
      setError({ message: 'Cannot construct artifact :C' });
      return;
    }
    if (!decodedAbi.abi.length) {
      setError({ message: 'ABI must have at least 1 item' });
      return;
    }
    if (!name) {
      setError({ message: 'Enter ABI name' });
      return;
    }
    setError(undefined);
    if (props.artifact) {
      removeArtifact(props.artifact);
    }
    const artifact = new Artifact(name, () => decodedAbi.abi, decodedAbi.hash);
    addArtifact(artifact);
    setArtifact(artifact);
    close();
  }

  const details = useMemo(() => {
    if (!error?.details) {
      return;
    }
    const RE = /position (\d+)/;
    const match = error.details.match(RE);
    if (!match) {
      return error.details;
    }

    return (
      <div>
        {error.details.substring(0, match.index!)}
        <Link onClick={() => {
          const position = Number(match[1]);
          abiInputRef.current?.setSelectionRange(position, position);
          abiInputRef.current?.focus();
        }}>{match[0]}</Link>
        {error.details.substring(match.index! + match[0].length + 1)}
      </div>
    );
  }, [error])

  return (
    <Dialog onClose={close} open={open} fullWidth={true}>
      <DialogTitle>Add</DialogTitle>
      <DialogActions>
        <Button onClick={() => close()}>Cancel</Button>
        <Button onClick={() => createArtifact()}>Add</Button>
      </DialogActions>
      <DialogContent>
        <DialogContentText ref={nameInputRef}>
          {error && (
            <Alert severity='error'>
              <AlertTitle>{error.message}</AlertTitle>
              {details}
            </Alert>
          )}
        </DialogContentText>
        <TextField
          autoFocus
          fullWidth
          margin="dense"
          label="name"
          variant="filled"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          fullWidth
          autoFocus
          label='hash'
          margin="dense"
          disabled={true}
          value={decodedAbi?.hash ?? ''}
        />
        <TextField
          multiline
          autoFocus
          margin="dense"
          label="ABI"
          fullWidth
          variant="outlined"
          minRows={20}
          value={abiStr}
          onChange={(e) => setAbiStr(e.target.value)}
          error={!!error && !decodedAbi}
          inputRef={abiInputRef}
        />
      </DialogContent>
      <BottomNavigation
      >
        <BottomNavigationAction
          label="Go to top"
          onClick={() => {
            nameInputRef.current?.scrollIntoView();
          }}
          icon={error ? <ErrorOutlineIcon color='error' /> : <ArrowUpwardIcon />}
        />
      </BottomNavigation>
    </Dialog >
  )
}

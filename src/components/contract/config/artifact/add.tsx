import React, { useMemo, useState } from 'react'
import { Dialog, DialogTitle, DialogContentText, Button, DialogActions, DialogContent, TextField } from '@mui/material';
import { GetArtifactError, Artifact, safeDecodeAndValidateAbi } from 'helpers/abi';
import { useArtifactStore } from 'hooks/use-artifact-store';
import { useContractCtx } from 'contexts/contract';
import { SafeError } from 'types/common';
import { useArtifactCtx } from 'contexts/artifact';

interface iProps {
  open: boolean;
  close: () => void;
}
export const AddArtifactDialog: React.FC<iProps> = (props) => {
  const { close, open } = props;
  const [name, setName] = useState('');
  const [abiStr, setAbiStr] = useState('');
  const [error, setError] = useState<SafeError>();
  // const [_, addArtifact] = useArtifactStore();
  const { addArtifact } = useArtifactCtx();
  const { setArtifact } = useContractCtx();

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
    if (!name || !decodedAbi) {
      if (!error) {
        setError({ message: 'Cannot construct artifact' });
      }
      return;
    }
    setError(undefined);
    const artifact = new Artifact(name, () => decodedAbi.abi, decodedAbi.hash);
    addArtifact(artifact);
    setArtifact(artifact);
    close();
  }

  return (
    <Dialog onClose={close} open={open} fullScreen>
      <DialogTitle>Set backup account</DialogTitle>
      <DialogContent>
          <DialogContentText>
            {error?.message}
            <br />
            {error?.details}
          </DialogContentText>
          <DialogActions>
            <Button onClick={() => close()}>Cancel</Button>
            <Button onClick={() => createArtifact()}>Add</Button>
          </DialogActions>
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
          error={!!error}
        />
      </DialogContent>
      <DialogActions>
        <Button
          autoFocus
          onClick={() => {
            window.scroll(0, 0)
            document.body.scrollTo({ top: 0 });
            console.log('scroll!!!');
          }
          }
        >
          Go to the top!
        </Button>
      </DialogActions>
    </Dialog>
  )
}

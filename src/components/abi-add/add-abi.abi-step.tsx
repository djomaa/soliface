import React, { useDeferredValue, useEffect, useRef, useState } from 'react'


import TextField from '@mui/material/TextField';
import { safeDecodeAndValidateAbi } from 'helpers/abi/abi';
import { SafeError } from 'types/common';
import { AddAbiStep, useAddAbiCtx } from './ctx';
import { formatAbiError } from './abi-step.abi';
import AlertTitle from '@mui/material/AlertTitle';
import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import { DefaultAbi } from 'constants/abi';

const AbiStepCore: React.FC = (props) => {
  const ctx = useAddAbiCtx();

  // const [strAbi, setStrAbi] = useState('');
  const [strAbi, setStrAbi] = useState(JSON.stringify(DefaultAbi['Erc20']));
  const [abiError, setAbiError] = useState<SafeError>();

  const deferredStrAbi = useDeferredValue(strAbi);

  const abiInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!deferredStrAbi) {
      setAbiError(undefined)
      ctx.setAbi(undefined);
      return
    }
    const [error, value] = safeDecodeAndValidateAbi(deferredStrAbi)
    if (error) {
      setAbiError(error)
      ctx.setAbi(undefined);
      return
    }
    setAbiError(undefined)
    ctx.setAbi(value.abi);
  }, [deferredStrAbi]);

  return (
    <>

      <TextField
        multiline
        autoFocus
        margin="dense"
        label="ABI"
        fullWidth
        minRows={2}
        variant="outlined"
        InputProps={{
          style: {
            minHeight: '80vh'
          }
        }}
        value={strAbi}
        inputRef={abiInputRef}
        onChange={(e) => setStrAbi(e.target.value)}
      />
      {abiError && (
        <Paper sx={{ position: 'sticky', marginTop: '3vh', bottom: '2vh', left: 0, right: 0 }} elevation={3}>
          <Alert severity='error'>
            <AlertTitle>{abiError.message}</AlertTitle>
            {formatAbiError({ error: abiError, abiInputRef })}
          </Alert>
        </Paper>
      )}
    </>
  )
}

export const AbiStep: React.FC = () => {
  const ctx = useAddAbiCtx()
  if (ctx.step !== AddAbiStep.ABI) {
    return <></>
  }
  return <AbiStepCore />
}

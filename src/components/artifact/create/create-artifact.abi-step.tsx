import React, { useDeferredValue, useEffect, useRef, useState } from 'react'

import Alert from '@mui/material/Alert';
import Paper from '@mui/material/Paper';
import AlertTitle from '@mui/material/AlertTitle';

import { SafeError } from 'types/common';
import { safeAbiFromString } from 'helpers/abi/parse';
import { createPositionRef } from 'utils/input/position-ref';

import { AddAbiStep, useAddAbiCtx } from './ctx';
import { TextArea } from 'components/textarea';


const AbiStepCore: React.FC = () => {
  const ctx = useAddAbiCtx();

  const [strAbi, setStrAbi] = useState('');
  const [abiError, setAbiError] = useState<SafeError>();

  const deferredStrAbi = useDeferredValue(strAbi);

  const abiInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!deferredStrAbi) {
      setAbiError(undefined)
      ctx.setAbi(undefined);
      return
    }
    const [error, value] = safeAbiFromString(deferredStrAbi)
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

      <TextArea
        multiline
        autoFocus
        fullWidth
        label="ABI"
        margin="dense"
        minHeight='75vh'
        variant="outlined"
        value={strAbi}
        inputRef={abiInputRef}
        onChange={(e) => setStrAbi(e.target.value)}
      />
      {abiError && (
        <Paper sx={{ position: 'sticky', marginTop: '3vh', bottom: '2vh', left: 0, right: 0 }} elevation={3}>
          <Alert severity='error'>
            <AlertTitle>{abiError.message}</AlertTitle>
            {abiError.details ? createPositionRef(abiInputRef, abiError.details) : <></>}
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

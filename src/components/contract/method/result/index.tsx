import React, { useMemo, useState } from 'react'
import { Box } from '@mui/system'
import { AbiItem, AbiOutput } from 'types/abi';
import { IAction } from 'hooks/use-async-action';
import { Alert, AlertTitle, Stack, Switch, TextField, Typography } from '@mui/material';
import { AbiCoderError, useWeb3 } from 'contexts/web3';
import { MethodDecodedResult } from './decoded-result';
import { useMethodCtx } from '../context';

enum Mode {
  Raw,
  Decoded,
}

function parseActionError(error: unknown): { title: string, body: JSX.Element } {
  if (error instanceof AbiCoderError) {
    return {
      title: error.message,
      body: <>{error.details}</>
    }
  }
  if (error instanceof Error) {
    return {
      title: 'Unexpected error',
      body: <>{error.toString()}</>,
    }
  } else {
    return {
      title: 'Unregonized error',
      body: <>Error is in the console</>
    }
  }
}

interface iProps {}
export const MethodResult: React.FC<iProps> = () => {
  const [mode, setMode] = useState<Mode>(Mode.Decoded);
  const web3 = useWeb3();
  const { action, abi } = useMethodCtx();

  const result = useMemo(() => {
    if (!action || !action.result) {
      return;
    }
    if (mode === Mode.Raw) {
      return <>{action.result}</>;
    }

    if (!action.result) {
      throw new Error('MethodResult: Result is empty');
    }

    if (mode === Mode.Decoded) {
      return (
        <MethodDecodedResult
          abi={abi}
          raw={action.result}
          web3={web3}
        />
      )
    }

  }, [action?.result, mode]);

  if (!action || action.loading) {
    return <></>;
  }

  if (action.error) {
    const { title, body } = parseActionError(action.error);
    return (
      <Alert severity='error'>
        <AlertTitle>{title}</AlertTitle>
        {body}
      </Alert>
    )
  }

  if (!action.result) {
    return <></>;
  }

  return (
    <>
      <Alert severity='success' variant='outlined'
        sx={{
          '& .MuiAlert-message': {
            width: '100%',
          }
        }}
      >
        <AlertTitle>
          <Stack direction="row" alignItems="center" spacing={5}>
            <Typography>Success</Typography>
            <Stack direction="row" alignItems="center">
              <Typography>Raw</Typography>
              <Switch
                checked={mode === Mode.Decoded}
                onChange={() => setMode((p) => Number(!!!p))}
              />
              <Typography>Decoded</Typography>
            </Stack>
          </Stack>
        </AlertTitle>
        {result}
      </Alert>
    </>
  )
}

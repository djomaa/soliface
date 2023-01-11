import React, { useMemo, useState } from 'react'

import Stack from '@mui/material/Stack';
import Switch from '@mui/material/Switch';
import Typography from '@mui/material/Typography';

import { useWeb3 } from 'contexts/web3';
import { useLogger } from 'hooks/use-logger';
import { IAction } from 'hooks/use-async-action';

import { BaseResult } from '../base';
import { useMethodCtx } from '../../context';
import { MethodDecodedResult } from './decoded-result';

enum Mode {
  Raw,
  Decoded,
}

interface iProps {
  action?: IAction<string>;
}
export const CallResult: React.FC<iProps> = ({ action }) => {
  const [logger] = useLogger(CallResult);
  const [mode, setMode] = useState<Mode>(Mode.Decoded);
  const web3 = useWeb3();
  const { abi } = useMethodCtx();


  const title = (
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
  )

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

  return <BaseResult action={action} title={title} body={result} />;
}

import React, { useMemo, useState } from 'react'
import { Box, Stack, Switch, TextField, Typography } from '@mui/material';
import { useWeb3 } from 'contexts/web3';
import { useMethodCtx } from '../../context';
import { IAction } from 'hooks/use-async-action';
import { useLogger } from 'hooks/use-logger';
import { BaseResult } from '../base';

enum Mode {
  Raw,
  Decoded,
}

interface iProps {
  action?: IAction<string>;
}
export const EncodeResult: React.FC<iProps> = ({ action }) => {
  const [logger] = useLogger(EncodeResult);
  const web3 = useWeb3();


  const title = (
    <Stack direction="row" alignItems="center" spacing={5}>
      <Typography>Success</Typography>
    </Stack>
  )

  const result = useMemo(() => {
    logger.debug('Action changed', action)
    if (!action || !action.result) {
      return;
    }
    return (
      <TextField
        disabled
        fullWidth
        multiline
        value={action.result}
      />
    );
  }, [action?.result]);

  return <BaseResult action={action} title={title} body={result} />;
}

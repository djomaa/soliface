import React, { useMemo } from 'react'
import { Stack, TextField, Typography } from '@mui/material';

import { useLogger } from 'hooks/use-logger';
import { IAction } from 'hooks/use-async-action';

import { BaseResult } from '../base';

interface iProps {
  action?: IAction<string>;
}
export const EncodeResult: React.FC<iProps> = ({ action }) => {
  const [logger] = useLogger(EncodeResult);

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

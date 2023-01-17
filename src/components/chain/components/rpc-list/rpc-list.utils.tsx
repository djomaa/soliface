import React from 'react';
import Tooltip from '@mui/material/Tooltip';
import { UseQueryResult } from 'react-query';
import CircleIcon from '@mui/icons-material/Circle';
import CircularProgress from '@mui/material/CircularProgress';

import { IData } from './query';

export function getStatusWeight(params: UseQueryResult<IData>) {
  if (params.isSuccess) {
    return 1;
  }
  if (params.isLoading) {
    return 0;
  }
  if (params.isError) {
    return -1;
  }
  throw new Error(`${getStatusWeight}: Unable to determine status`)
}

export function getStatusIcon(params: UseQueryResult<IData>) {
  if (params.isLoading) {
    return <CircularProgress size='20px' variant='indeterminate' />;
  }
  if (params.isError) {
    return (
      <Tooltip title={String(params.error)}>
        <CircleIcon color='error' />
      </Tooltip>
    )
  }
  return <CircleIcon color='success' />
}

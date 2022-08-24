import React from 'react';
import { ButtonGroup } from '@mui/material';

import { CallAction } from './call.action';
import { WriteAction } from './write.action';

export const MethodActions = () => {
  return (
    <ButtonGroup>
      <CallAction />
      <WriteAction />
    </ButtonGroup>
  );
}

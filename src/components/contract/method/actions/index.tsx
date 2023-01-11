import React from 'react';

import ButtonGroup from '@mui/material/ButtonGroup';

import { CallAction } from './call.action';
import { WriteAction } from './write.action';
import { EncodeAction } from './encode.action';

export const MethodActions = () => {
  return (
    <ButtonGroup>
      <CallAction />
      <WriteAction />
      <EncodeAction />
    </ButtonGroup>
  );
}

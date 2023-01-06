import React from 'react';
import { Stack } from '@mui/material';

import { parseInput } from './parse';
import { TxParams } from './tx-params';
import { useMethodCtx } from '../context';

interface iProps {
}
export const MethodInputs: React.FC<iProps> = () => {
  const { abi } = useMethodCtx();
  const inputs = abi.inputs
    ?.map((input, i) => {
      return parseInput(input, ['params', i], [input.name]);
    })
    .flat()

  return (
    <>
      {inputs && (
        <Stack>
          {inputs}
        </Stack>
      )}
      <TxParams abi={abi} />
    </>
  );
}

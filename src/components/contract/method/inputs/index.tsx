import { Stack } from '@mui/material';
import React from 'react';
import { AbiInput, AbiItem } from 'types/abi';
import { useMethodCtx } from '../context';
import { MethodArrayInput } from './array-input';
import { MethodInput, iInputProps } from './input';
import { parseInput } from './parse';
import { TxParams } from './tx-params';

interface iProps {
}
export const MethodInputs: React.FC<iProps> = () => {
  const { abi } = useMethodCtx();
  const inputs = abi.inputs
    ?.map((item, i) => {
      return parseInput(item, ['params', i], []);
    })
    .flat()
  // .map((item) => {
  //   return <MethodInput key={item.label} {...item} />;
  // })

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

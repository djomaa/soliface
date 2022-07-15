import { Stack } from '@mui/material';
import React from 'react';
import { AbiInput, AbiItem } from 'types/abi';
import { useMethodCtx } from '../context';
import { MethodInput, iInputProps } from './input';
import { TxParams } from './tx-params';

const parseInput = (input: AbiInput, path: number[], prefix?: string): iInputProps[] => {
  const fullName = prefix ? `${prefix}.${input.name}` : input.name;
  if (input.components) {
    return input.components.map((item, i) => parseInput(item, [...path, i], fullName)).flat();
  }
  const item = { label: fullName, type: input.type, path: ['params', ...path] };
  return [item];
}

interface iProps {
}
export const MethodInputs: React.FC<iProps> = () => {
  const { abi } = useMethodCtx();
  const inputs = abi.inputs
    ?.map((item, i) => {
      return parseInput(item, [i]);
    })
    .flat()
    .map((item) => {
      return <MethodInput key={item.label} {...item} />;
    })

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

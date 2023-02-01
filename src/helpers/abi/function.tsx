import Box from '@mui/material/Box';
import React from 'react';
import { AbiInput, AbiItem } from 'types/abi';

export function buildFunctionParameters(inputs?: AbiInput[]) {
  if (!inputs || inputs.length === 0) {
    return '';
  }
  const str = inputs
    .map((input) => {
      return `${input.type} ${input.name}`;
    })
    .join(', ');
  return `(${str})`
}

export function buildFunction(abi: AbiItem) {
  const params = buildFunctionParameters(abi.inputs);
  return `function ${abi.name}(${params})`
}

export const FunctionRepresentation: React.FC<{ abi: AbiItem }> = ({ abi }) => {
  return (
    <Box>
      {abi.name}
      &nbsp;
      <small>
        <i>
          {buildFunctionParameters(abi.inputs)}
        </i>
      </small>
    </Box>
  )
};

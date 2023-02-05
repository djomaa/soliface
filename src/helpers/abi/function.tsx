import Box from '@mui/material/Box';
import React from 'react';
import { AbiInput, AbiItem, AbiOutput } from 'types/abi';

export function buildFunctionParameters(item?: (AbiInput | AbiOutput)[]) {
  if (!item || item.length === 0) {
    return '';
  }
  const str = item
    .map((input) => {
      const type = input.internalType;
      return input.name ? `${type} ${input.name}` : type;
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
        &nbsp;
        {abi.stateMutability}
        &nbsp;
        <b>
          returns
        </b>
        &nbsp;
        <i>
          {buildFunctionParameters(abi.outputs)}
        </i>
      </small>

    </Box>
  )
};

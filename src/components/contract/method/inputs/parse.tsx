import React from 'react';

import { AbiInput } from 'types/abi';

import { MethodInput } from './base';
import { MethodArrayInput } from './array';
import { MethodStructInput } from './struct/struct.input';

const ARRAY_RE = /\[([^\[\]]*)\]$/

// TODO: refactor to useMethodsInputs
// TODO: use common logger
export const parseInput = (input: AbiInput, position: any[], path: any[]): JSX.Element[] => {
  const { name, type, components } = input;
  const match = type.match(ARRAY_RE);
  const isArray = !!match;
  const hasChildren = !!components?.length;

  console.debug('parseInput', input, { hasChildren, isArray, match })

  const fullPath = [...path];
  if (!isArray && hasChildren) {
    return [<MethodStructInput type={input.internalType!} position={position} path={fullPath} components={input.components!} />]
  }
  if (!isArray && !hasChildren) {
    console.debug('parseInput', 'base');
    return [<MethodInput name={name} type={type} position={position} path={fullPath} />];
  }

  const comps = [{
    ...input,
    internalType: input.internalType!.replace(ARRAY_RE, ''),
    type: type.replace(ARRAY_RE, ''),
  }];
  const size = match && match[1] ? Number(match[1]) : undefined;
  console.debug('parseInput', 'array', { comps, size });
  return [<MethodArrayInput type={input.internalType!} key={name} position={position} path={fullPath} components={comps} size={size} />];
}

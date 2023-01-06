import React from 'react';

import { AbiInput } from 'types/abi';

import { MethodInput } from './input';
import { MethodArrayInput } from './array-input';
import { MethodStructInput } from './struct-input';

const ARRAY_RE = /\[([^\[\]]*)\]$/

export const parseInput = (input: AbiInput, position: any[], path: any[]): JSX.Element[] => {
  const { name, type, components } = input;
  const match = type.match(ARRAY_RE);
  const isArray = !!match;
  const hasChildren = !!components?.length;

  const fullPath = [...path, input.name];
  if (!isArray && hasChildren) {
    return [<MethodStructInput position={position} path={fullPath} components={input.components!} />]
  }
  if (!isArray && !hasChildren) {
    return [<MethodInput name={name} type={type} position={position} path={fullPath} />];
  }

  const comps = hasChildren ? components : [{
    ...input,
    type: type.replace(ARRAY_RE, ''),
  }];

  const size = match && match[1] ? Number(match[1]) : undefined;
  return [<MethodArrayInput type={type} key={name} position={position} path={fullPath} components={comps} size={size} />];
}

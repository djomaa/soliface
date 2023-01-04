import React from 'react';
import { AbiInput } from 'types/abi';
import { MethodArrayInput } from './array-input';

import { MethodInput } from './input';

const ARRAY_RE = /\[[^\[\]]*\]/

export const parseInput = (input: AbiInput, position: any[], path: any[]): JSX.Element[] => {
  const { name, type, components } = input;
  const re = type.match(ARRAY_RE);
  const isArray = !!re;
  const hasChildren = !!components?.length;

  const fullPath = [...path, input.name];
  console.log('parseInput', { input, isArray, hasChildren, position, fullPath });
  if (!isArray && hasChildren) {
    return components.map((component, i) => parseInput(component, [...position, i], fullPath)).flat();
  }
  if (!isArray && !hasChildren) {
    console.log('parseInput', { input, position, fullPath });
    return [<MethodInput name={name} type={type} position={position} path={fullPath} />];
  }

  const comps = hasChildren ? components : [{
    ...input,
    type: type.replace(ARRAY_RE, ''),
  }];

  return [<MethodArrayInput key={name} position={position} path={fullPath} components={comps} />];
}

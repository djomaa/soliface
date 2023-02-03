import React from 'react'

import { AbiInput } from 'types/abi'
import { useLogger } from 'hooks/use-logger'

import { MethodInput } from './base'
import { MethodArrayInput } from './array'
import { MethodStructInput } from './struct/struct.input'
import { ARRAY_PATTERN, hasAbiInputChildren } from './types'

export type InputPath = string | number;
export type InputPosition = string | number;

// TODO: rename path to labels, position to path
interface IProps {
  input: AbiInput;
  /**
   * Path of input, displayed as label
   */
  path: InputPath[];
  /**
   * Position in form
  */
  position: InputPosition[];
}
export const Input: React.FC<IProps> = ({ input, path, position }) => {
  const [Logger] = useLogger(Input);

  const isArray = ARRAY_PATTERN.test(input.type);
  const hasChildren = hasAbiInputChildren(input);

  if (!isArray && hasChildren) {
    Logger.debug('Structure', input, { hasChildren, isArray })
    return <MethodStructInput input={input} position={position} path={path} />
  }
  if (isArray) {
    Logger.debug('Array', input, { hasChildren, isArray })
    return <MethodArrayInput input={input} position={position} path={path} />
  }

  Logger.debug('Base', input, { hasChildren, isArray })
  return <MethodInput type={input.type} position={position} path={path} />

}

// it's recursive, that's why memo is used
export const MemoizedInput = React.memo(Input);

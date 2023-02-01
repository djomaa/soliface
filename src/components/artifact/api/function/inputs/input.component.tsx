import React from 'react'

import { AbiInput } from 'types/abi'

import { MethodInput } from './base'
import { MethodArrayInput } from './array'
import { MethodStructInput } from './struct/struct.input'

const ARRAY_RE = /\[([^\[\]]*)\]$/

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

  const { name, type, components } = input
  const match = type.match(ARRAY_RE)
  const isArray = !(match == null)
  const hasChildren = !!components?.length

  // Logger.debug('parseInput', input, { hasChildren, isArray, match })

  const fullPath = [...path]
  if (!isArray && hasChildren) {
    return <MethodStructInput type={input.internalType!} position={position} path={fullPath} components={input.components!} />
  }
  if (!isArray && !hasChildren) {
    // Logger.debug('parseInput', 'base')
    return <MethodInput name={name} type={type} position={position} path={fullPath} />
  }

  const comps = [{
    ...input,
    internalType: input.internalType!.replace(ARRAY_RE, ''),
    type: type.replace(ARRAY_RE, '')
  }]
  const size = (match != null) && match[1] ? Number(match[1]) : undefined
  // Logger.debug('parseInput', 'array', { comps, size })
  return <MethodArrayInput type={input.internalType!} key={name} position={position} path={fullPath} components={comps} size={size} />

}

// it's recursive, that's why memo is used
export const MemoizedInput = React.memo(Input);

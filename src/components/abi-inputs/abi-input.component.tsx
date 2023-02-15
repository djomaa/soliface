import React from 'react'

import { AbiInput } from 'types/abi'
import { useLogger } from 'hooks/use-logger'

import { MethodArrayInput } from './array'
import { MethodStructInput } from './struct'
import { PrimitiveInput } from './primitive'
import { ARRAY_PATTERN, hasAbiInputChildren, PathAndLabelProps } from './types'

// TODO: rename path to labels, position to path
interface IProps extends PathAndLabelProps {
  input: AbiInput;
}
export const AbiInputComponent: React.FC<IProps> = ({ input, path, labels }) => {
  const [Logger] = useLogger(AbiInputComponent);

  const isArray = ARRAY_PATTERN.test(input.type);
  const hasChildren = hasAbiInputChildren(input);

  if (!isArray && hasChildren) {
    Logger.debug('Structure', input, { hasChildren, isArray })
    return <MethodStructInput input={input} labels={labels} path={path} />
  }
  if (isArray) {
    Logger.debug('Array', input, { hasChildren, isArray })
    return <MethodArrayInput input={input} labels={labels} path={path} />
  }

  Logger.debug('Base', input, { hasChildren, isArray })
  return <PrimitiveInput type={input.type} labels={labels} path={path} />

}

// it's recursive, that's why memo is used
export const MemoizedInput = React.memo(AbiInputComponent);

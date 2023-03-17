import React from 'react'

import { AbiInput } from 'types/abi'
import { useLogger } from 'hooks/use-logger'

import { MethodArrayInput } from './array'
import { MethodStructInput } from './struct'
import { PrimitiveInput } from './primitive'
import { ARRAY_PATTERN, hasAbiInputChildren, PathAndLabelProps } from './types'
import assert from 'assert'

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

type Item = { name: string, component: React.ReactElement, child?: Group };
class Group {
  list: Item[] = [];
  parent?: Group;

  constructor(parent?: Group) {
    this.parent = parent;
  }

  add(item: Item) {
    this.list.push(item);
  }

}

export class GroupManager {
  // parent?: Group;
  current: Group = new Group();

  enter(item: Item) {
    const child = new Group(this.current);
    this.current.add({ ...item, child });
    this.current = child;
    // this.parent = this.current;
  }

  exit() {
    assert(this.current.parent);
    this.current = this.current.parent;
  }

}
// // const gm = new GroupManager();

// export function* parse({ input, path, labels }: IProps) {
//   const [Logger] = useLogger(AbiInputComponent);

//   const { register } = useAbiInputsCtx();
//   const isArray = ARRAY_PATTERN.test(input.type);
//   const hasChildren = hasAbiInputChildren(input);

//   if (!isArray && hasChildren) {
//     Logger.debug('Structure', input, { hasChildren, isArray })
//     register(labels, <h2>{labels.join('.')}</h2>)
//     yield* parseStruct({
//       input, path, labels
//     });
//   }
//   if (isArray) {
//     Logger.debug('Array', input, { hasChildren, isArray })
//     return <MethodArrayInput input={input} labels={labels} path={path} />
//   }

//   Logger.debug('Base', input, { hasChildren, isArray })
//   yield { title: }
//   return <PrimitiveInput type={input.type} labels={labels} path={path} />

// }

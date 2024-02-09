import * as yup from 'yup';
import assert from 'assert';

import { AbiInput, AbiItem } from 'types/abi'
import { PartialRequired } from 'types/common';

import { ARRAY_PATTERN } from '../abi-input/types';
import { ArgumentsObject } from '../artifact/api/function/ctx/function.ctx-types';


// TODO:- make inputs required in type
export function createAbiItemSchema(abi: AbiItem) {
  assert(abi.inputs);
  return yup.object<ArgumentsObject>().shape({
    params: createAbiInputsSchema(abi.inputs)
  });
}

export function createAbiInputsSchema(inputs: AbiInput[]) {
  const shape = inputs.map((input) => {
    return createInputSchema(input);
  }) as [yup.Schema, ...yup.Schema[]];
  return yup.tuple(shape);
}

export function createStructSchema(input: PartialRequired<AbiInput, 'components'>) {
  assert(input.components.length)
  return createAbiInputsSchema(input.components);
}

export function createArraySchema(input: AbiInput) {
  const match = input.type.match(ARRAY_PATTERN);
  assert(match);
  const size = match[0] ? Number(match[0]) : undefined;
  // subType can be constructed using substring
  const subType = input.type.replace(ARRAY_PATTERN, '');
  const subSchema = createInputSchema({
    ...input,
    type: subType,
  })
  const schema = yup.array().of(subSchema)
  if (size) {
    schema.length(size);
  }
  return schema;
}

export function createInputSchema(input: AbiInput): yup.Schema {
  const isArray = ARRAY_PATTERN.test(input.type);
  const hasChildren = abiHasChildren(input);

  if (!isArray && hasChildren) {
    return createStructSchema(input);
  }
  if (!isArray && !hasChildren) {
    if (input.type === 'bool') {
      return yup.bool().required();
    }
    return yup.string().required();
  }

  return createArraySchema(input);
}

function abiHasChildren(input: AbiInput): input is PartialRequired<AbiInput, 'components'> {
  return !!input.components;
}

/*
array[][2]
[
  [1, ..., 100],
  [101, ..., 200],
]

array[][1][2]
[
  [
    [x, ..., y]
  ],
  [
    [q, ..., a]
  ]
]
*/

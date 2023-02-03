// import { AbiInput } from 'types/abi'
// import * as yup from 'yup';
// import assert from 'assert';

// // const ARRAY_RE = /\[([^\[\]]*)\]$/
// const ARRAY_RE = /\[(\d*)\]$/;

// // type PartialRequired<T, TKeys extends keyof T> = Omit<T, TKeys> & Pick<Required<T>, TKeys>
// type PartialRequired<T, TKeys extends keyof T> = T & Pick<Required<T>, TKeys>

// export function createAbiInputsSchema(inputs: AbiInput[]) {
//   const shape = inputs.reduce((acc, input, i) => {
//     acc[i] = createInputSchema(input);
//     return acc;
//   }, {} as Record<number, yup.AnySchema>)
//   return yup.object().shape(shape);
// }

// export function createStructSchema(input: PartialRequired<AbiInput, 'components'>) {
//   assert(input.components.length)
//   return createAbiInputsSchema(input.components);
// }

// export function createArraySchema(input: AbiInput) {
//   const match = input.type.match(ARRAY_RE);
//   assert(match);
//   const size = match[0] ? Number(match[0]) : undefined;
//   // subType can be constructed using substring
//   const subType = input.type.replace(ARRAY_RE, '');
//   const subSchema = createInputSchema({
//     ...input,
//     type: subType,
//   })
//   const schema = yup.array().of(subSchema)
//   if (size) {
//     schema.length(size);
//   }
//   return schema;
// }

// export function createInputSchema(input: AbiInput): yup.AnySchema {
//   const isArray = ARRAY_RE.test(input.type);
//   const hasChildren = abiHasChildren(input);


//   if (!isArray && hasChildren) {
//     return createStructSchema(input);
//   }
//   if (!isArray && !hasChildren) {
//     // Logger.debug('parseInput', 'base')
//     return yup.string().required();
//     // return <MethodInput name={ name } type = { type } position = { position } path = { fullPath } />
//   }

//   return createArraySchema(input);
// }

// function abiHasChildren(input: AbiInput): input is PartialRequired<AbiInput, 'components'> {
//   return !!input.components;
// }

// /*
// array[][2]
// [
//   [1, ..., 100],
//   [101, ..., 200],
// ]

// array[][1][2]
// [
//   [
//     [x, ..., y]
//   ],
//   [
//     [q, ..., a]
//   ]
// ]
// */

export { }

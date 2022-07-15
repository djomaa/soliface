// import { JTDSchemaType } from 'ajv/dist/core';
// import { useEffect } from 'react';
// import { AbiInput, AbiItem, AbiOutput } from 'types/abi';
// import { useStorage } from './use-storage';


// const abiInputSchema: JTDSchemaType<AbiInput, { AbiInput: AbiInput }>= {
//   definitions: {
//     AbiInput: {
//       properties: {
//         name: { type: 'string' },
//         type: { type: 'string' },
//       },
//       optionalProperties: {
//         indexed: { type: 'boolean' },
//         components: {
//           elements: { ref: "AbiInput"},
//         },
//         internalType: { type: 'string' }, // TODO: strict solidity type
//       },
//     },
//   },
//   ref: "AbiInput",

// }

// const abiOutputSchema: JTDSchemaType<AbiOutput, { AbiOutput: AbiOutput }>= {
//   definitions: {
//     AbiOutput: {
//       properties: {
//         name: { type: 'string' },
//         type: { type: 'string' },
//       },
//       optionalProperties: {
//         components: {
//           elements: { ref: "AbiOutput"},
//         },
//         internalType: { type: 'string' }, // TODO: strict solidity type
//       },
//     },
//   },
//   ref: "AbiOutput",

// }

// export interface AbiItem {
//   anonymous?: boolean;
//   constant?: boolean;
//   // inputs?: AbiInput[];
//   name?: string;
//   // outputs?: AbiOutput[];
//   payable?: boolean;
//   // stateMutability?: StateMutabilityType;
//   // type: AbiType;
//   gas?: number;
// }

// const schema: JTDSchemaType<AbiItem> = {
//   optionalProperties: {
//     constant: { type: 'boolean' },
//     // inputs: {}
//     name: { type: 'string' },
//     // outputs: {}
//     payable: { type: 'boolean' },
//     // stateMutability: {}
//     // type: {}
//     gas: { type: 'number' },
//   }
// }

export {}

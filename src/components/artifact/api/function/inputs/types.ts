import { AbiInput } from 'types/abi';
import { PartialRequired } from 'types/common';

export type AbiInputWithChildren = PartialRequired<AbiInput, 'components'>;

export function hasAbiInputChildren(abi: AbiInput): abi is AbiInputWithChildren {
  return !!abi.components;
}

export const ARRAY_PATTERN = /\[(\d*)\]$/;

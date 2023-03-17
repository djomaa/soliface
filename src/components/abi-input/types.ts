import { AbiInput } from 'types/abi';
import { PartialRequired, StringifyAble } from 'types/common';

export type AbiInputWithChildren = PartialRequired<AbiInput, 'components'>;
export type InputLabel = StringifyAble;
export type InputPath = StringifyAble;
export type PathAndLabelProps = {
  /**
   * Path (form input name)
  */
  path: InputPath[];
  /**
   * Path of input, displayed as label
   */
  labels: InputLabel[];
}

export function hasAbiInputChildren(abi: AbiInput): abi is AbiInputWithChildren {
  return !!abi.components;
}

export const ARRAY_PATTERN = /\[(\d*)\]$/;

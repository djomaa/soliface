import { AbiItem } from 'types/abi';
import { sha256 } from 'utils/hash';

export function hashAbi(abi: AbiItem[]) {
  const str = JSON.stringify(abi);
  return sha256(str);
}

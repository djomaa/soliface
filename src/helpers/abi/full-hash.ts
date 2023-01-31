import { AbiItem } from 'types/abi';

export function fullHash(abi: AbiItem[]) {
  const str = JSON.stringify(abi);
  const encoder = new TextEncoder();
  const buffer = encoder.encode(str);
  return crypto.subtle.digest('SHA-256', buffer);
}

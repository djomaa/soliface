import { useStoreKey } from 'contexts/store';
import { IArtifact } from './types';

export const Key = (hash: IArtifact['hash']) => {
  const generateKey = (property: string) => useStoreKey.Pure('artifact', hash, property);
  return {
    name: generateKey('name'),
    abi: generateKey('abi'),
  }
}

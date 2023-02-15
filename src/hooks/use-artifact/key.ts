import { useStoreKey } from 'contexts/store';
import { IArtifact } from './types';

export const KeyParts = (hash: IArtifact['hash']) => {
  const generateKey = (property: string) => {
    const parts = ['artifact', hash, property]
    return parts;
  };
  return {
    name: generateKey('name'),
    abi: generateKey('abi'),
  }
}

// TODO: rename to createArtifactKey
type ArtifactStoreKeyMap = Record<keyof ReturnType<typeof KeyParts>, string>
export const Key = (hash: IArtifact['hash']) => {
  const parts = KeyParts(hash);
  const result = Object.entries(parts).reduce((acc, [key, value]) => {
    const tKey = key as keyof ArtifactStoreKeyMap;
    acc[tKey] = useStoreKey.Pure(...value);
    return acc
  }, {} as ArtifactStoreKeyMap)
  return result
}

import { useStoreKey } from 'contexts/store';
import { IArtifact } from './types';

const key = (hash: IArtifact['hash']) => {
  return useStoreKey.Pure('artifact', hash, 'abi');
}

export const useAbi = () => {
  // return useStore<string>(key(chainId))
}

useAbi.key = key;

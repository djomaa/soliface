import { useStoreCtx } from 'contexts/store';
import { useCallback } from 'react';
import { Key } from './key';
import { IArtifact } from './types';
import { useStoredArtifactHash } from 'contexts/contract';

export const useArtifactRemoveAction = () => {
  const store = useStoreCtx();
  const [storedArtifactHash, setStoredArtifactHash] = useStoredArtifactHash();
  // const

  const remove = useCallback((hash: IArtifact['hash']) => {
    const key = Key(hash);
    store.set(key.name, undefined);
    store.set(key.abi, undefined);
    if (storedArtifactHash === hash) {
      setStoredArtifactHash(undefined);
    }
  }, [storedArtifactHash]);

  return { removeArtifact: remove };
}

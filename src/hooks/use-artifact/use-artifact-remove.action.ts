import { useStoreCtx } from 'contexts/store';
import { useCallback } from 'react';
import { AbiItem } from 'types/abi';
import { Key } from './key';
import { IArtifact } from './types';

interface IArtifactSaveData extends Pick<IArtifact, 'hash' | 'name'> {
  abi: AbiItem[];
}
export const useArtifactRemoveAction = () => {
  const store = useStoreCtx();

  const remove = useCallback((data: IArtifactSaveData) => {
    const key = Key(data.hash);
    const rawAbi = JSON.stringify(data.abi);
    store.set(key.name, undefined);
    store.set(key.abi, undefined);
  }, []);

  return { removeArtifact: remove };
}

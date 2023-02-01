import { useStoreCtx } from 'contexts/store';
import { useCallback } from 'react';
import { AbiItem } from 'types/abi';
import { Key } from './key';
import { IArtifact } from './types';

interface IArtifactSaveData extends Pick<IArtifact, 'hash' | 'name'> {
  abi: AbiItem[];
}
export const useArtifactSaveAction = () => {
  const store = useStoreCtx();

  const save = useCallback((data: IArtifactSaveData) => {
    const key = Key(data.hash);
    const rawAbi = JSON.stringify(data.abi);
    store.set(key.name, data.name);
    store.set(key.abi, rawAbi);
  }, []);

  return { saveArtifact: save };
}

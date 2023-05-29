import { useStore, useStoreKey } from 'contexts/store';
import { createUseCtx } from 'contexts/ctx-factory';

import { ContractCtx } from './contract.ctx-state';

export const useContractCtx = createUseCtx(ContractCtx, 'ContractCtx');

const prefix = 'contract';
const Key = {
  Address: useStoreKey.Pure(prefix, 'address'),
  ArtifactHash: useStoreKey.Pure(prefix, 'artifactHash')
}

export const useStoredAddress = () => {
  return useStore<string>(Key.Address);
}

export const useStoredArtifactHash = () => {
  return useStore<string>(Key.ArtifactHash)
}

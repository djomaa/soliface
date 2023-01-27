import { useContext } from 'react';
import { StorageCtx } from '../storage.ctx';

export const useStoreCtx = () => {
  const ctx = useContext(StorageCtx);
  if (!ctx) {
    throw new Error('Not storage ctx provider found');
  }
  return ctx;
}

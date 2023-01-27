import { StorageCtx } from '../store.ctx';
import { createUseCtx } from '../../ctx-factory';

export const useStoreCtx = createUseCtx(StorageCtx);

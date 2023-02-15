import { createUseCtx } from '../../ctx-factory';
import { StorageCtx } from '../store.ctx-state';

export const useStoreCtx = createUseCtx(StorageCtx, 'StorageCtx');

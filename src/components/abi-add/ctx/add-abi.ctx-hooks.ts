import { createUseCtx } from 'contexts/ctx-factory';
import { AddAbiCtx } from './add-abi.ctx';

export const useAddAbiCtx = createUseCtx(AddAbiCtx, 'AddAbiCtx');

import { createUseCtx } from 'contexts/ctx-factory';

import { AddAbiCtx } from './create-artifact.ctx';

export const useAddAbiCtx = createUseCtx(AddAbiCtx, 'AddAbiCtx');

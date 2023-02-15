import { createUseCtx } from 'contexts/ctx-factory';

import { FunctionCtx } from './function.ctx-state';

export const useFunctionCtx = createUseCtx(FunctionCtx, 'FunctionCtx')

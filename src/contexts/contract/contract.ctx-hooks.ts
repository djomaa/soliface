import { createUseCtx } from 'contexts/ctx-factory';

import { ContractCtx } from './contract.ctx';

export const useContractCtx = createUseCtx(ContractCtx, 'ContractCtx');

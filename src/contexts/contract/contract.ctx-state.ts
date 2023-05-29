import { createContext } from 'react';

export interface ContractCtxState {
  artifactHash?: string;
  address?: string
  setAddress: (address: string) => void
  setArtifactHash: (artifact: string | undefined) => void
}
export const ContractCtx = createContext<ContractCtxState | null>(null);

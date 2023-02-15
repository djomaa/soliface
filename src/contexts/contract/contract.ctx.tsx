import React, { createContext } from 'react'

import { useLogger } from 'hooks/use-logger'
import { useStore, useStoreKey } from 'contexts/store';

export interface ContractCtxState {
  artifactHash?: string;
  address?: string
  setAddress: (address: string) => void
  setArtifactHash: (artifact: string) => void
}
export const ContractCtx = createContext<ContractCtxState | null>(null)

interface iProps {
  children: React.ReactNode | React.ReactNode[]
}

const prefix = 'contract';
const Key = {
  Address: useStoreKey.Pure(prefix, 'address'),
  ArtifactHash: useStoreKey.Pure(prefix, 'artifactHash')
}
export const ContractCtxProvider: React.FC<iProps> = ({ children }) => {
  const [logger, { logState }] = useLogger(ContractCtxProvider)

  const [address, setAddress] = useStore<string>(Key.Address)
  const [artifactHash, setArtifactHash] = useStore<string>(Key.ArtifactHash)

  logState('address', address);
  logState('artifactHash', artifactHash);

  const value: ContractCtxState = {
    address,
    setAddress,
    artifactHash,
    setArtifactHash,
  }

  return (
    <ContractCtx.Provider value={value}>
      {children}
    </ContractCtx.Provider>
  )
}

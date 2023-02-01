import React, { createContext, useState } from 'react'

import { useLogger } from 'hooks/use-logger'

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
export const ContractCtxProvider: React.FC<iProps> = ({ children }) => {
  const [logger, { logState }] = useLogger(ContractCtxProvider)

  const [address, setAddress] = useState<string>('')
  const [artifactHash, setArtifactHash] = useState<string>()

  logState('address', address);
  logState('artifactHash', artifactHash);

  const value = {
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

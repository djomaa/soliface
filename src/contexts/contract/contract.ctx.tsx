import React, { createContext, useState } from 'react'

import { Artifact } from 'helpers/abi/artifact'
import { useLogger } from 'hooks/use-logger'

export interface ContractCtxState {
  artifact?: Artifact
  address?: string
  setAddress: (address: string) => void
  setArtifact: (artifact: Artifact) => void
}
export const ContractCtx = createContext<ContractCtxState | null>(null)

interface iProps {
  children: React.ReactNode | React.ReactNode[]
}
export const ContractCtxProvider: React.FC<iProps> = ({ children }) => {
  const [logger, { logState }] = useLogger(ContractCtxProvider)

  const [address, setAddress] = useState<string>('')
  const [artifact, setArtifact] = useState<Artifact | undefined>()

  logState('artifact', artifact)

  const value = {
    address,
    setAddress,
    artifact,
    setArtifact
  }

  return (
    <ContractCtx.Provider value={value}>
      {children}
    </ContractCtx.Provider>
  )
}

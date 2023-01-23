import React, { createContext, useContext, useState } from 'react'

import { Artifact } from 'helpers/abi'
import { useLogger } from 'hooks/use-logger'

interface IState {
  artifact?: Artifact
  address?: string
  setAddress: (address: string) => void
  setArtifact: (artifact: Artifact) => void
}
export const ContractContext = createContext<IState>({
  artifact: undefined,
  address: undefined,
  setAddress: () => { },
  setArtifact: () => { }
})

export const useContractCtx = () => {
  return useContext(ContractContext)
}

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
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  )
}

import { useSearchParams } from 'react-router-dom'
import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'

import { safe } from 'helpers/safe'
import { Artifact } from 'helpers/abi'
import { decodeB64 } from 'helpers/base64'
import { useLogger } from 'hooks/use-logger'
import { useArtifactStore } from 'hooks/use-artifact-store'

enum SearchParam {
  Address = 'address',
  Artifact = 'artifact',
  ArtifactHash = 'artifactHash',
}

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

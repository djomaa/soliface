import React from 'react'

import { useLogger } from 'hooks/use-logger'
import { useArtifact } from 'hooks/use-artifact';
import { useStoredAddress, useStoredArtifactHash } from './contract.ctx-hooks';
import { ContractCtx, ContractCtxState } from './contract.ctx-state';


export const ContractCtxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [Logger, { logState }] = useLogger(ContractCtxProvider)

  const [address, setAddress] = useStoredAddress();
  const [artifactHash, setArtifactHash] = useStoredArtifactHash();
  const artifact = useArtifact(artifactHash || '');

  logState('address', address);
  logState('artifactHash', artifactHash);
  logState('artifact', artifact);

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

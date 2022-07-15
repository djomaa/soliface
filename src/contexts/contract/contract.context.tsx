import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useArtifactStore } from 'hooks/use-artifact-store';
import { Artifact, safeDecodeAndValidateAbi } from 'helpers/abi';
import { decodeB64, encodeB64 } from 'helpers/base64';
import { safe, safeValue } from 'helpers/safe';
import { useLogger } from 'hooks/use-logger';
import { useArtifactCtx } from 'contexts/artifact';

enum SearchParam {
  Address = 'address',
  Artifact = 'artifact',
}

interface IState {
  artifact?: Artifact;
  address?: string;
  setAddress: (address: string) => void;
  setArtifact: (artifact: Artifact) => void;
}
export const ContractContext = createContext<IState>({
  artifact: undefined,
  address: undefined,
  setAddress: () => {},
  setArtifact: () => {},
});

export const useContractCtx = () => {
  return useContext(ContractContext);
}

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}
export const ContractCtxProvider: React.FC<iProps> = ({ children }) => {

  const [logger, { logState }] = useLogger(ContractCtxProvider);
  const { artifacts, addArtifact } = useArtifactCtx();


  const [search, setSearch] = useSearchParams();
  const initial = useMemo(() => {
    const address = search.get(SearchParam.Address);
    let artifact: Artifact = artifacts[0]
    if (search.has(SearchParam.Artifact)) {
      const b64Artifact = search.get(SearchParam.Artifact)!;
      const strArtifact = decodeB64(b64Artifact);
      const [decoded, error] = safe(() => Artifact.fromString(strArtifact));
      if (decoded) {
        artifact = decoded;
        addArtifact(artifact);
      }
      if (error) {
        logger.log('failed to decode artifact from search', error);
      }
    }
    return { address, artifact };
  }, [])

  const [address, setAddress] = useState<string>(initial.address ?? '');
  const [artifact, setArtifact] = useState(initial.artifact);

  logState('artifact', artifact);

  useEffect(() => {
    search.set(SearchParam.Address, address);
    search.set(SearchParam.Artifact, encodeB64(artifact.toString()));
    setSearch(search);
  }, [address, artifact])

  const value = {
    address, setAddress,
    artifact, setArtifact,
  }

  return (
    <ContractContext.Provider value={value}>
      {children}
    </ContractContext.Provider>
  )
}

import React, { createContext, useContext, useEffect, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { safe } from 'helpers/safe';
import { Artifact } from 'helpers/abi';
import { decodeB64 } from 'helpers/base64';
import { useLogger } from 'hooks/use-logger';
import { useArtifactStore } from 'hooks/use-artifact-store';

enum SearchParam {
  Address = 'address',
  Artifact = 'artifact',
  ArtifactHash = 'artifactHash',
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
  setAddress: () => { },
  setArtifact: () => { },
});

export const useContractCtx = () => {
  return useContext(ContractContext);
}

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}
export const ContractCtxProvider: React.FC<iProps> = ({ children }) => {

  const [logger, { logState }] = useLogger(ContractCtxProvider);
  const artifacts = useArtifactStore();


  const [search, setSearch] = useSearchParams();
  const initial = useMemo(() => {
    const address = search.get(SearchParam.Address);
    let artifact: Artifact | undefined;
    if (search.has(SearchParam.ArtifactHash)) {
      const searchHash = search.get(SearchParam.ArtifactHash);
      const fArtifact = artifacts.list.find((i) => i.hash === searchHash);
      if (fArtifact) {
        artifact = fArtifact;
      } else {
        logger.log('Artifact not found by search hash', searchHash, artifacts.list)
      }
    }
    if (search.has(SearchParam.Artifact)) {
      const b64Artifact = search.get(SearchParam.Artifact)!;
      const strArtifact = decodeB64(b64Artifact);
      const [decoded, error] = safe(() => Artifact.fromString(strArtifact));
      if (decoded) {
        artifact = decoded;
        artifacts.add(artifact);
      }
      if (error) {
        logger.log('failed to decode artifact from search', error);
      }
    }
    return { address, artifact };
  }, [])

  const [address, setAddress] = useState<string>(initial.address ?? '');
  const [artifact, setArtifact] = useState<Artifact | undefined>(initial.artifact);

  logState('artifact', artifact);

  useEffect(() => {
    if (address) {
      search.set(SearchParam.Address, address);
    } else {
      search.delete(SearchParam.Address);
    }
    if (artifact) {
      search.set(SearchParam.ArtifactHash, artifact.hash);
    } else {
      search.delete(SearchParam.ArtifactHash);
    }
    // search.set(SearchParam.Artifact, encodeB64(artifact.toString()));
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

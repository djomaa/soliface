import React, { createContext } from 'react';

import { Artifact } from 'helpers/abi';
import { DefaultAbi } from 'constants/abi';
import { useLogger } from 'hooks/use-logger';
import { useArtifactStore } from 'hooks/use-artifact-store';

const DefaultArtifacts = Object.keys(DefaultAbi).map((name) => new Artifact(name, () => DefaultAbi[name]));

interface IState {
  artifacts: Artifact[];
  addArtifact: (artifact: Artifact) => void;
  removeArtifact: (artifact: Artifact) => void;
  saveArtifact: (artifact: Artifact) => void;
}

export const ArtifactContext = createContext<IState | null>(null);

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}
export const ArtifactCtxProvider: React.FC<iProps> = (props) => {
  const { children } = props;

  const [logger, { logState }] = useLogger(ArtifactCtxProvider);

  const [artifacts, addArtifact, removeArtifact, saveArtifact] = useArtifactStore();

  // const [artifacts, setArtifacts] = useState(DefaultArtifacts);
  // const addArtifact = useCallback((artifact: Artifact) => {
  //   setArtifacts((p) => {
  //     for (const item of p) {
  //       if (item.hash === artifact.hash && item.name === artifact.name) {
  //         return p;
  //       }
  //     }
  //     return [...artifacts, artifact];
  //   });
  // }, []);

  logState('artifacts', artifacts);

  const value = { artifacts, addArtifact, removeArtifact, saveArtifact };
  return (
    <ArtifactContext.Provider value={value}>
      {children}
    </ArtifactContext.Provider>
  )

}

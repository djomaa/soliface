import { useCallback, useEffect, useState } from 'react';
import { DefaultAbi } from 'constants/abi'
import { AbiItem } from 'types/abi';
import { Artifact } from 'helpers/abi';
import { useLogger } from './use-logger';

const DefaultArtifacts = Object.keys(DefaultAbi).map((name) => new Artifact(name, () => DefaultAbi[name]));

export const useArtifactStore = () => {

  const [logger, { logState }] = useLogger(useArtifactStore);

  const [list, setList] = useState(DefaultArtifacts);
  const add = useCallback((artifact: Artifact) => {
    for (const item of list) {
      if (item.hash === artifact.hash && item.name === artifact.name) {
        return;
      }
    }
    setList([...list, artifact]);
    // setList((p) => {
    //   for (const item of p) {
    //     if (item.hash === artifact.hash && item.name === artifact.name) {
    //       return p;
    //     }
    //   }
    //   return [...list, artifact];
    // });
  }, [list]);

  logState('artifacts', list);

  return [list, add] as const;

}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultAbi } from 'constants/abi'
import { AbiItem } from 'types/abi';
import { Artifact } from 'helpers/abi';
import { useLogger } from './use-logger';
import { LocalStorageWrap } from './use-artifacts-storage';

type IShortList = Pick<Artifact, 'name' | 'hash'>[];

const Storage = new LocalStorageWrap('artifacts');

function getOriginalList(): Artifact[] {
  const oList = Storage.get<IShortList>('list');
  if (!oList) {
    return [];
  }
  const result = oList.map(({ name, hash }) => {
    return new Artifact(name, () => Storage.get<AbiItem[]>('item', hash)!, hash);
  })
  return result;
}

const DefaultArtifacts = Object.keys(DefaultAbi).map((name) => new Artifact(name, () => DefaultAbi[name]));

export const useArtifactStore = () => {

  const [logger, { logState }] = useLogger(useArtifactStore);


  const [list, setList] = useState(getOriginalList());
  const add = useCallback((artifact: Artifact) => {
    logger.log('Add artifact', artifact.name, artifact.hash)
    for (const item of list) {
      if (item.hash === artifact.hash && item.name === artifact.name) {
        return;
      }
    }
    setList([...list, artifact]);
  }, [list]);

  useEffect(() => {
    logger.log('Updating..')
    const existing = Storage.getAllKeys('item', '.*');
    console.log("🚀 ~ file: use-artifact-store.ts ~ line 30 ~ useEffect ~ existing", existing)
    for (const item of existing) {
      const cur = list.find((i) => i.actualHash === item);
      if (!cur) {
        logger.log('Removing', item)
        Storage.remove('item', item);
      }
    }
    for (const item of list) {
      if (!Storage.get(item.hash)) {
        logger.log('Adding', item)
        Storage.set(item.abi, 'item', item.hash);
      }
    }
    const shortList = list.map((item) => {
      return {
        name: item.name,
        hash: item.hash,
      }
    })
    Storage.set(shortList, 'list');
    logger.log('Updated!')
  }, [list]);

  const fullList = useMemo(() => {
    return [...DefaultArtifacts, ...list];
  }, [list]);

  return [fullList, add] as const;

}

import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultAbi } from 'constants/abi'
import { AbiItem } from 'types/abi';
import { Artifact } from 'helpers/abi';
import { useLogger } from './use-logger';
import { LocalStorageWrap } from './use-local-storage';

type IShortList = Pick<Artifact, 'name' | 'hash'>[];

const Storage = new LocalStorageWrap('artifacts');

const DefaultArtifacts = Object.keys(DefaultAbi).map((name) => new Artifact(name, () => DefaultAbi[name]));


function getOriginalList(): Artifact[] {
  const oList = Storage.get<IShortList>('list');
  if (!oList || !oList.length) {
    return DefaultArtifacts;
  }
  const result = oList.map(({ name, hash }) => {
    return new Artifact(name, () => Storage.get<AbiItem[]>('item', hash)!, hash);
  })
  return result;
}


const ITEM = 'item';

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

  const save = useCallback((artifact: Artifact) => {
    logger.log('Save artifact', artifact.name, artifact.hash)
    const isPresented = list.find((a) => a.hash === artifact.hash);
    Storage.set(artifact.abi, artifact.hash);
    if (isPresented) {
      setList([...list]);
    } else {
      logger.warn('Artifact not presented');
      setList([...list, artifact]);
    }
  }, [list]);

  const remove = useCallback((artifact: Artifact) => {
    logger.log('Remove artifact', artifact.name, artifact.hash);
    const result = list.filter((a) => a.hash !== artifact.hash);
    if (result.length === list.length) {
      return;
    }
    setList(result);
  }, [list]);

  useEffect(() => {
    logger.log('Updating..', list)
    const existing = Storage.getAllKeys(ITEM, '.*');
    logger.debug('Keys fetched', existing)
    for (const item of existing) {
      const cur = list.find((i) => i.hash === item);
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
    // const defaults: Artifact[] = [];
    // for (const defaultArtifact of DefaultArtifacts) {
    //   const isProvided = list.find((a) => a.hash === defaultArtifact.hash);
    //   if (!isProvided) {
    //     defaults.push(defaultArtifact);
    //   }
    // }
    // return [...defaults, ...list];
    return [...list];
  }, [list]);

  return [fullList, add, remove, save] as const;

}

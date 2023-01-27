import { useLogger } from 'hooks/use-logger';
import React, { createContext, useCallback, useEffect } from 'react'
import { useMap, usePrevious } from 'react-use'
import { StringifyAble } from 'types/common';
import { LocalStorage } from 'utils/local-storage';

export type StoreKey = StringifyAble;
export type StoreValue = object | string | number | null;


interface IState {
  store: Record<string, any>;
  set: (key: string, value: any) => void;
  get: (key: string) => StoreValue | undefined;
  remove: (key: string) => void;
  watch: (key: string) => void;
  unwatch: (key: string) => void;
}

export const StorageCtx = createContext<IState | null>(null)

export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {
  const [Logger] = useLogger(StorageCtxProvider);

  const [store, storeActions] = useMap<Record<string, StoreValue | undefined>>();
  const [map, mapActions] = useMap<Record<string, number>>();

  const pMap = usePrevious(map);
  useEffect(() => {
    const logger = Logger.sub('refresh');
    logger.debug('Started', { pMap, map });
    for (const key in map) {
      if (pMap) {
        const prevWatchers = pMap[key];
        if (prevWatchers) {
          continue;
        }
      }
      const value = LocalStorage.get<StoreValue>(key);
      Logger.sub(key, 'refresh').debug('Obtain to memory store ', { value });
      storeActions.set(key, value);
    }
    if (pMap) {
      for (const pKey in pMap) {
        const currentWatchers = map[pKey];
        if (!currentWatchers) {
          // rm from store to clear memory
          Logger.sub(pKey, 'refresh').debug('Remove from memory store');
          storeActions.remove(pKey);
        }
      }
    }
    logger.debug('Done');
  }, [map, storeActions]);

  // useEffect(() => {
  //   const logger = Logger.sub('update');
  //   logger.debug('Starting', { store });
  //   for (const key in map) {
  //     // TODO: compare
  //     if (store[key] === undefined) {
  //       // logger.sub(key).debug('Remove');
  //       // LocalStorage.remove(key);
  //     } else {
  //       // const value = store[key];
  //       // logger.sub(key).debug('Set', { value })
  //       // LocalStorage.put(key, value);
  //     }
  //   }
  // }, [store])

  const set = useCallback((key: string, value: any) => {
    Logger.sub(key, 'storage').debug('Set to storage', { value })
    storeActions.set(key, value);
    LocalStorage.put(key, value);
  }, [storeActions]);

  const remove = useCallback((key: string) => {
    Logger.sub(key, 'storage').debug('Clear storage', { value })
    storeActions.set(key, undefined);
    LocalStorage.remove(key);
  }, [storeActions]);

  const watch = useCallback((key: string) => {
    const logger = Logger.sub(key, 'watch')
    // const current = mapActions.get(key);
    const current = map[key];
    logger.debug('Current watcher count', { current, map })
    if (current) {
      const newValue = current + 1;
      logger.debug('Increased', { newValue });
      // mapActions.set(key, current + 1);
      map[key] = current + 1;
    } else {
      logger.debug('Create', { key });
      // mapActions.set(key, 1);
      map[key] = 1;
    }
  }, [mapActions, map]);

  const unwatch = useCallback((key: string) => {
    const logger = Logger.sub(key, 'unwatch');
    const current = mapActions.get(key);
    logger.debug('Doing', { current });
    if (!current) {
      throw new Error(`${StorageCtxProvider.name}: key not watched "${key}"`);
    }
    if (current > 1) {
      // there are more watchers
      logger.debug('There are more watchers, decreasing')
      mapActions.set(key, current - 1);
      return;
    }
    // that's the last listener, so clear everything
    logger.debug('That was last, clearing');
    mapActions.remove(key);
    storeActions.remove(key);
  }, []);

  const value: IState = {
    store,
    get: storeActions.get,
    set,
    remove,
    watch,
    unwatch,
  }

  return (
    <StorageCtx.Provider value={value}>
      {props.children}
    </StorageCtx.Provider>
  )


}

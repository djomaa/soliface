import { useLogger } from 'hooks/use-logger';
import React, { createContext, useCallback } from 'react'
import { useMap } from 'react-use'
import { StringifyAble } from 'types/common';
import { LocalStorage } from 'utils/local-storage';

export type StoreKey = StringifyAble;
export type StoreValue = object | string | number | null;
type StoreItem = { value: StoreValue | undefined };

interface IState {
  store: Record<string, any>;
  set: (key: string, value: any) => void;
  get: (key: string) => StoreValue | undefined;
  remove: (key: string) => void;
  watch: (key: string) => void;
  unwatch: (key: string) => void;
}

export const StorageCtx = createContext<IState | null>(null)

function methods(state: Record<string, StoreValue>) {
  return {
    set(key: string) {
      return state;
    }
  }
}

export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {
  const [Logger] = useLogger(StorageCtxProvider);

  // const store1 = useMethods(methods, {});
  // const [s, sActions] = useMethods(methods, {});

  const [store, storeActions] = useMap<Record<string, StoreItem>>();
  // const [store, setStore] = useState<Record<string, StoreValue | undefined>>({});
  const [map, mapActions] = useMap<Record<string, number>>();

  const obtain = (key: string) => {
    const value = LocalStorage.get<StoreValue>(key);
    Logger.sub(key, 'obtain').debug('Done', { value });
    return value
  }

  const get = useCallback((key: string) => {
    const hasKey = key in store;
    console.log("🚀 ~ file: storage.ctx.tsx:44 ~ get ~ hasKey", hasKey)
    if (hasKey) {
      return store[key].value;
    }
    return obtain(key);
  }, [store]);

  const set = useCallback((key: string, value: StoreValue) => {
    Logger.sub(key, 'storage').debug('Set', { value })
    storeActions.set(key, { value });
    LocalStorage.put(key, value);
  }, [storeActions]);

  const remove = useCallback((key: string) => {
    Logger.sub(key, 'storage').debug('Remove', { value })
    storeActions.set(key, { value: undefined });
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
      map[key] = current + 1;
    } else {
      logger.debug('Create', { key });
      map[key] = 1;
      storeActions.set(key, { value });
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
    get,
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

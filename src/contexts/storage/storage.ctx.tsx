import React, { createContext, useCallback, useEffect } from 'react'
import { useMap } from 'react-use'
import { LocalStorage } from 'utils/local-storage';

interface IState {
  store: Record<string, any>;
  set: (key: string, value: any) => void;
  get: <T>(key: string) => T;
}

export const StorageCtx = createContext<IState | null>(null)

// const get = 

export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {

  const [store, storeActions] = useMap<Record<string, any>>();

  const set = useCallback((key: string, value: any) => {
    storeActions.set(key, value);
  }, [storeActions])

  useEffect(() => {
    for (const key in store) {
      // TODO: compare
      LocalStorage.put(key, store[key]);
    }
  }, [store])

  const value = {
    store,
    get: storeActions.get,
    set,
  }

  return (
    <StorageCtx.Provider value={value}>
      {props.children}
    </StorageCtx.Provider>
  )


}

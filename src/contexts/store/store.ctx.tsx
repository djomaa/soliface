import { useLogger } from 'hooks/use-logger';
import React, { createContext } from 'react'
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from 'react-use/lib/misc/hookState';
import { StringifyAble } from 'types/common';
import { LocalStorage } from 'utils/local-storage';

export type StoreKey = StringifyAble;
export type StoreValue = object | string | number;
type StoreItem = { value: StoreValue | undefined };
type Watcher = Function;

export interface StoreCtxState {
  getOriginalState(key: string): StoreValue | undefined;
  addWatcher(key: string, watcher: Watcher): void;
  removeWatcher(key: string, watcher: Watcher): void;
  set(key: string, value: IHookStateSetAction<StoreValue | undefined>): void;
}

export const StorageCtx = createContext<StoreCtxState | null>(null)


export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {
  const [Logger] = useLogger(StorageCtxProvider);

  // const [store] = useMap<Record<string, StoreItem>>({});
  const store: Record<string, StoreItem> = {};
  // const [watchers] = useMap<Record<string, Function[]>>({});
  const watchers: Record<string, Watcher[]> = {};

  const getOriginalState = (key: string) => {
    const logger = Logger.sub(key, getOriginalState.name);
    if (key in store) {
      const value = store[key].value;
      logger.debug('Read from store', { result: value });
      return value;
    }
    const value = LocalStorage.get<StoreValue>(key);
    logger.debug('Read original', { result: value });
    store[key] = { value };
    return value;
  }

  const addWatcher = (key: string, watcher: Watcher) => {
    const logger = Logger.sub(key, addWatcher.name);
    logger.debug('Adding', { watcher });
    if (!watchers[key]) {
      logger.debug('Created');
      watchers[key] = [watcher];
      return;
    }
    if (watchers[key].includes(watcher)) {
      throw new Error('already watched');
    }
    logger.debug('Pushed');
    watchers[key].push(watcher);
    // const value = LocalStorage.get<StoreValue | undefined>(key);
    // store[key] = { value };
  }

  const removeWatcher = (key: string, watcher: Watcher) => {
    const logger = Logger.sub(key, removeWatcher.name);
    logger.debug('Removing', { watcher });
    if (!watchers[key]) {
      throw new Error('key not in watchers');
    }
    if (!watchers[key].includes(watcher)) {
      throw new Error('watcher not found');
    }
    watchers[key] = watchers[key].filter((w) => w !== watcher);
    logger.debug('Removed', { watcher });
    if (watchers[key].length === 0) {
      logger.debug('That was last one, clearing');
      delete watchers[key];
      delete store[key];
    }
  }

  const set = (key: string, nextState: IHookStateInitAction<StoreValue | undefined>) => {
    const logger = Logger.sub(key, set.name);
    logger.debug('Setting', { nextState });
    if (!watchers[key]) {
      throw new Error('no watchers exists');
    }
    const current = store[key].value;
    const newValue = resolveHookState(nextState, current);
    if (newValue === undefined) {
      LocalStorage.remove(key);
    } else {
      LocalStorage.put(key, newValue);
    }
    store[key] = { value: newValue };
    logger.debug('Set', { current, newValue });
    for (const watcher of watchers[key]) {
      watcher(newValue);
    }
    logger.debug('Emitted', { count: watchers[key] });
  }

  const value: StoreCtxState = {
    getOriginalState,
    addWatcher,
    removeWatcher,
    set,
  }

  return (
    <StorageCtx.Provider value={value}>
      {props.children}
    </StorageCtx.Provider>
  )


}

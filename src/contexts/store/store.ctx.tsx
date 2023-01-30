import { useLogger } from 'hooks/use-logger';
import React, { createContext, useRef } from 'react'
import { IHookStateInitAction, IHookStateSetAction, resolveHookState } from 'react-use/lib/misc/hookState';
import { StringifyAble } from 'types/common';
import { LocalStorage } from 'utils/local-storage';

export type StoreKey = StringifyAble;
export type StoreValue = object | string | number;
type StoreItem = { value: StoreValue | undefined };
type Listener = (value: StoreValue | undefined) => void;
type WatcherFn = (key: string, value: StoreValue | undefined) => void;
type WatcherId = string;
type Watcher = { pattern: RegExp, fn: WatcherFn };
type WatcherRef = WeakRef<Watcher>;

export interface StoreCtxState {
  getOriginalState(key: string): StoreValue | undefined;
  addListener(key: string, listener: Listener): void;
  removeListener(key: string, listener: Listener): void;
  set(key: string, value: IHookStateSetAction<StoreValue | undefined>): void;
  addWatcher(pattern: RegExp, fn: WatcherFn): WatcherId;
  removeWatcher(watcherId: WatcherId): void
}

export const StorageCtx = createContext<StoreCtxState | null>(null)

// safety check - the errors should never throw, used to test

// TODO: cache watcherRef by watcher (and remove on watcher removing) to implement safety check * in addListener (watchers stage)
export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {
  const [Logger] = useLogger(StorageCtxProvider);

  // const [store] = useMap<Record<string, StoreItem>>({});
  const store: Record<string, StoreItem> = {};
  const listeners: Record<string, Listener[]> = {};
  const watchers = new Map<WatcherId, Watcher>();
  const watcherByKey = new Map<string, Set<WatcherRef>>();

  const watcherId = useRef(0);


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

  const addListener = (key: string, listener: Listener) => {
    const logger = Logger.sub(key, addListener.name);
    logger.debug('Starting', { listener });
    if (!listeners[key]) {
      logger.debug('Listeded created');
      listeners[key] = [listener];
    } else if (listeners[key].includes(listener)) {
      // safety check *
      throw new Error('listeners[key].includes(listener)');
    } else {
      listeners[key].push(listener);
      logger.debug('Listenere pushed');
    }


    if (watcherByKey.has(key)) {
      // safety check *
      throw new Error('watcherByKey.has(key)');
    }
    const list = new Set<WatcherRef>();
    watcherByKey.set(key, list);
    for (const [watcherId, watcher] of watchers.entries()) {
      if (!watcher.pattern.test(key)) {
        continue;
      }
      list.add(new WeakRef(watcher));
      logger.debug('Watcher added', { watcherId, watcher });
    }
    logger.debug('Done');
  }

  const removeListener = (key: string, listener: Listener) => {
    const logger = Logger.sub(key, removeListener.name);
    logger.debug('Removing', { watcher: listener });
    if (!listeners[key]) {
      throw new Error('!listeners[key]');
    }
    if (!listeners[key].includes(listener)) {
      throw new Error('!listeners[key].includes(listener)');
    }
    listeners[key] = listeners[key].filter((w) => w !== listener);
    logger.debug('Listener removed', { listener });

    if (listeners[key].length === 0) {
      logger.debug('That was last one, clearing');
      delete listeners[key];
      delete store[key];
    }

    watcherByKey.delete(key);
    logger.debug('Key watchers deleted');
  }

  const addWatcher = (pattern: RegExp, fn: WatcherFn) => {
    const cId = watcherId.current.toString();
    watcherId.current += 1;
    const watcher = { pattern, fn };
    Logger.sub('watcher').debug('Created', { id: cId, watcher })
    watchers.set(cId, watcher);
    return cId;
  }

  const removeWatcher = (id: WatcherId) => {
    if (!watchers.has(id)) {
      // safety check *
      throw new Error('no watcher found on removing')
    }
    const watcher = watchers.get(id);
    Logger.sub('watcher').debug('Deleted', { id, watcher });
    watchers.delete(id);

  }

  // TODO: put value to LC firstly, then don't modify the state is there is no listeners for a key. It would allow to work with ctx in async manner
  const set = (key: string, nextState: IHookStateInitAction<StoreValue | undefined>) => {
    const logger = Logger.sub(key, set.name);
    logger.debug('Setting', { nextState });
    if (!listeners[key]) {
      // safety check *
      throw new Error('no listeneres exist');
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
    for (const listener of listeners[key]) {
      listener(newValue);
    }
    logger.debug('Emitted', {
      listeners: listeners[key],
    });

    if (watchers.has(key)) {
      const list = watcherByKey.get(key)!;
      logger.debug('Watcher refs exist', { list })
      for (const watcherRef of list) {
        const watcher = watcherRef.deref();
        if (!watcher) {
          logger.debug('WatcherRef is empty, removing the ref from list');
          list.delete(watcherRef);
          continue;
        }
        logger.debug('Calling watcher', { watcher, newValue });
        watcher.fn(key, newValue);
      }
    }
  }

  const value: StoreCtxState = {
    getOriginalState,
    addListener,
    removeListener,
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

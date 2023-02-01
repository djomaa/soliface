import assert from 'assert';
import React, { useRef } from 'react'
import { resolveHookState } from 'react-use/lib/misc/hookState';

import { useLogger } from 'hooks/use-logger';
import { LocalStorage } from 'utils/local-storage';

import { StorageCtx, StoreCtxState } from './store.ctx-state';
import { StoreMigration } from './migrations/store-migration.component';
import { StoreItem, Listener, WatcherId, Watcher, WatcherRef, StoreValue, WatcherFn } from './store.ctx-types';

// safety check - the errors should never throw, used to test

// TODO: cache watcherRef by watcher (and remove on watcher removing) to implement safety check * in addListener (watchers stage)
// TODO: rewrite using maps
export const StorageCtxProvider: React.FC<{ children: React.ReactElement | React.ReactElement[] }> = (props) => {
  const [Logger] = useLogger(StorageCtxProvider);


  // const [store] = useMap<Record<string, StoreItem>>({});
  const store: Record<string, StoreItem> = {};
  const listeners: Record<string, Listener[]> = {};
  const watchers = new Map<WatcherId, Watcher>();
  const watcherByKey = new Map<string, Set<WatcherRef>>();

  const watcherId = useRef(0);


  const getState = (key: string) => {
    const logger = Logger.sub(key, getState.name);
    if (key in store) {
      const value = store[key].value;
      logger.debug('Read from memory', { result: value });
      return value;
    }
    const value = LocalStorage.get<StoreValue>(key);
    logger.debug('Read from store', { result: value });
    store[key] = { value };
    return value;
  }

  const addListener = (key: string, listener: Listener) => {
    const logger = Logger.sub(key, addListener.name);
    logger.debug('Starting', { listener });
    if (listeners[key]) {
      if (listeners[key].includes(listener)) {
        // safety check *
        throw new Error('listeners[key].includes(listener)');
      }
      listeners[key].push(listener);
      logger.debug('Listener pushed');
      return;
    }

    // that's first key push, lets check watchers
    logger.debug('Listeded created');
    listeners[key] = [listener];

    if (watcherByKey.has(key)) {
      // safety check *
      console.log(watcherByKey.get(key))
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
    watchers.set(cId, watcher);
    Logger.sub('watcher').debug('Created', { id: cId, watcher })

    for (const key in listeners) {
      if (!pattern.test(key)) {
        continue;
      }
      const list = watcherByKey.get(key);
      assert(list, 'watcherByKey[key] is created on addListener, and we are iterating over listeners');
      const watcherRef = new WeakRef(watcher);
      list.add(watcherRef);
      Logger.sub('watcher').debug('Attached', { watcherId: cId, key });
    }

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

  const update = (key: string, nextState: React.SetStateAction<StoreValue | undefined>) => {
    const logger = Logger.sub(key, update.name);
    const current = getState(key);
    const newValue = resolveHookState(nextState, current);
    logger.debug('Store updated', { current, newValue });
    LocalStorage.update(key, newValue)
    return newValue
  }

  // TODO: put value to LC firstly, then don't modify the state is there is no listeners for a key. It would allow to work with ctx in async manner
  const set = (key: string, nextState: React.SetStateAction<StoreValue | undefined>) => {
    const logger = Logger.sub(key, set.name);
    logger.debug('Started', { nextState });

    const newValue = update(key, nextState);

    if (!listeners[key]) {
      logger.debug('There are no listeners, so key is not in the store, so we need to check watchers');
      for (const [watcherId, watcher] of watchers) {
        if (!watcher.pattern.test(key)) {
          continue;
        }
        logger.debug('Calling watcher (from iterate over watchers)', { watcherId, watcher, newValue });
        watcher.fn(key, newValue);
      }

    } else {
      store[key] = { value: newValue };
      logger.debug('Set to memory', { newValue });
      for (const listener of listeners[key]) {
        listener(newValue);
      }
      logger.debug('Emitted', {
        listeners: listeners[key],
      });

      const list = watcherByKey.get(key)!;
      assert(list, 'watcherByKey[key] is created on addListener, and we are iterating over listeners');
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
    getState,
    addListener,
    removeListener,
    addWatcher,
    removeWatcher,
    set,
  }

  return (
    <StorageCtx.Provider value={value}>
      <StoreMigration />
      {props.children}
    </StorageCtx.Provider>
  )


}

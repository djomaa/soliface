import { createContext } from 'react';

import { Listener, StoreValue, WatcherFn, WatcherId } from './store.ctx-types';

export interface StoreCtxState {
  getState(key: string): StoreValue | undefined;
  addListener(key: string, listener: Listener): void;
  removeListener(key: string, listener: Listener): void;
  set(key: string, value: React.SetStateAction<StoreValue | undefined>): void;
  addWatcher(pattern: RegExp, fn: WatcherFn): WatcherId;
  removeWatcher(watcherId: WatcherId): void
}

export const StorageCtx = createContext<StoreCtxState | null>(null)

import { StringifyAble } from 'types/common';

export type StoreKey = StringifyAble;
export type StoreValue = object | string | number;
export type StoreItem = { value: StoreValue | undefined };
export type Listener = (value: StoreValue | undefined) => void;
export type WatcherFn = (key: string, value: StoreValue | undefined) => void;
export type WatcherId = string;
export type Watcher = { pattern: RegExp, fn: WatcherFn };
export type WatcherRef = WeakRef<Watcher>;

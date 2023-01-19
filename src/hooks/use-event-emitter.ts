import { useEffect } from 'react';

class EventEmitter {
  private store = new Map<string, Function[]>();

  emit(key: string) {
    if (!this.store.has(key)) {
      return;
    }
    for (const fn of this.store.get(key)!) {
      fn();
    }
  }

  on(key: string, listener: Function) {
    if (this.store.has(key)) {
      this.store.get(key)!.push(listener);
    } else {
      this.store.set(key, [listener]);
    }
  }

  off(key: string, listener: Function) {
    const arr = this.store.get(key);
    if (!arr) {
      throw new Error('No array found');
    }
    const clean = arr.filter((fn) => fn !== listener);
    if (clean.length === arr.length) {
      throw new Error('Listener not found');
    }
    this.store.set(key, clean);
  }
}

const ee = new EventEmitter();

export const useEventEmitter = (key: string, fn: Function) => {
  useEffect(() => {
    ee.on(key, fn);
    return () => {
      ee.off(key, fn);
    }
  });

  return () => ee.emit(key);
}

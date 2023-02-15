export class aIterator<T> {
  constructor(private o: () => IterableIterator<T>) { }

  filter(predicate: (value: T, index: number) => unknown): Generator<T>;
  filter<S extends T>(predicate: (value: T, index: number) => value is S): Generator<S>;
  *filter(predicate: (value: T, index: number) => unknown): Generator<T> {
    let i = 0;
    for (const value of this.o()) {
      const so = predicate(value, i);
      if (so) {
        yield value;
      }
      i += 1;
    }
  }

  filterIntoArray(predicate: (value: T, index: number) => unknown): T[];
  filterIntoArray<S extends T>(predicate: (value: T, index: number) => value is S): S[];
  filterIntoArray(predicate: (value: T, index: number) => unknown): T[] {
    const iterator = this.filter(predicate);
    return Array.from(iterator);
  }

  *map<U>(cb: (value: T, index: number) => U): Generator<U> {
    let i = 0;
    for (const value of this.o()) {
      const item = cb(value, i);
      yield item;
      i += 1;
      // result.push(item);
    }
    // return result;
  }

  mapIntoArray<U>(cb: (value: T, index: number) => U): U[] {
    const iterator = this.map(cb);
    return Array.from(iterator);
  }

  intoArray(): T[] {
    return Array.from(this.o());
  }

  reduce<U>(cb: (previousValue: U, currentValue: T, currentIndex: number) => U, initialValue: U): U {
    let i = 0;
    for (const value of this.o()) {
      cb(initialValue, value, i);
    }
    return initialValue;
  }
}

// reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T): T;
// reduce(callbackfn: (previousValue: T, currentValue: T, currentIndex: number, array: T[]) => T, initialValue: T): T;
// reduce<U>(callbackfn: (previousValue: U, currentValue: T, currentIndex: number, array: T[]) => U, initialValue: U): U;

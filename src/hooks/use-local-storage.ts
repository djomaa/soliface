import { createKey } from 'constants/storage';
import { useLocalStorage } from 'react-use'

// export const useStorage = <T>(key: string) => {
//   const fullKey = ['soliface', key].join(':');
//   const [value, store] = useState();
// }

// export const Storage = localStorage;

type Key = string | number

const DefaultKeysParams = {
  useBaseKey: true,
  asRegex: false,
}

export type Entry<T> = [key: string, value: T];

// TODO: use iterators
export class LocalStorageWrap {
  _baseKey: string;
  _store = localStorage;
  _delemiter = '/';

  constructor(...oKeys: string[]) {
    const keys = [LocalStorageWrap.PROJECT_NAME, ...oKeys];
    this._baseKey = this.formatKey(keys, false);

  }

  serialize<T>(value: T): string {
    return JSON.stringify(value);
  }
  deserialize<T>(value: string): T {
    return JSON.parse(value);
  }
  get<T>(...keys: Key[]) {
    const key = this.formatKey(keys)
    const raw = this._store.getItem(key);
    if (!raw) {
      return;
    }
    const value = this.deserialize<T>(raw);
    return value;
  }

  getAll(...keys: Key[]) {
    const key = this.formatKey(keys, false)
    const pattern = new RegExp(`^${key}`)
    const values = this.keys(pattern).map(key => this.get(key));
    return values;
  }

  getAllEntries<T>(...keys: Key[]): Entry<T>[] {
    const key = this.formatKey(keys, false)
    const pattern = new RegExp(`^${key}`)
    const entries = this.keys(pattern).map(key => {
      return [
        key,
        this.get(key)
      ] as Entry<T>;
    });
    return entries;
  }

  getAllKeys(...parts: (RegExp | string)[]) {
    const keys = parts.map(i => i.toString());
    const fullKey = this.formatKey(keys, false);
    const pattern = new RegExp(`^${fullKey}`)

    const result = this.keys(pattern);
    return result.map((key) => {
      const last = key.lastIndexOf(this._delemiter);
      return key.substring(last + 1);
    })
  }

  set<T>(value: T, ...keys: Key[]) {
    const key = this.formatKey(keys)
    const raw = this.serialize(value);
    this._store.setItem(key, raw);
  }

  remove(...keys: Key[]) {
    const key = this.formatKey(keys)
    this._store.removeItem(key);
  }

  _keys?: string[];;
  keys(pattern?: RegExp) {
    if (!this._keys) {
      const keys = [];
      for (let i = 0; i < localStorage.length; i++) {
        const key = localStorage.key(i);
        if (key === null) {
          break;
        }
        if (!key.startsWith(this._baseKey)) {
          continue;
        }
        const normalizedKey = this.removeKey(key, this._baseKey);
        keys.push(normalizedKey);
      }
      this._keys = keys;
    }

    if (!pattern) {
      return this._keys;
    }
    const keys = this._keys.filter((key) => {
      return pattern.test(key);
    })
    return keys;
  }


  formatKey(keys: Key[], useBaseKey: boolean = true) {
    const part = createKey(...keys);
    return useBaseKey ? createKey(this._baseKey, part) : part;
  }

  removeKey(value: string, key: string) {
    return value.substring(key.length + 1);
  }

  removeKeys(value: string, keys: string[]) {
    const totalLength = keys.reduce((acc, key) => acc + key.length + 1, 0);
    return value.substring(keys.length);
  }

  static PROJECT_NAME = 'soliface';
}

export const MyStorage = new LocalStorageWrap();
export { }

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
export class LocalStorageWrap {
  _baseKey: string;
  _store = localStorage;
  _delemiter = '/';

  constructor(...oKeys: string[]) {
    const keys = [LocalStorageWrap.PROJECT_NAME, ...oKeys];
    this._baseKey = this._key(keys, false);
    
  }

  serialize<T>(value: T): string {
    return JSON.stringify(value);
  }
  deserialize<T>(value: string): T {
    return JSON.parse(value);
  }
  get<T>(...keys: Key[]) {
    const key = this._key(keys)
    const raw = this._store.getItem(key);
    if (!raw) {
      return;
    }
    const value = this.deserialize<T>(raw);
    return value;
  }
  getAll(...keys: Key[]) {
    const key = this._key(keys, false)
    const pattern = new RegExp(`^${key}`)
    const values = this.keys(pattern).map(key => this.get(key));
    return values;
  }

  getAllKeys(...parts: (RegExp | string)[]) {
    const keys = parts.map(i => i.toString());
    const fullKey = this._key(keys, false);
    const pattern = new RegExp(`^${fullKey}`)

    return this.keys(pattern);
  }

  set<T>(value: T, ...keys: Key[]) {
    const key = this._key(keys)
    const raw = this.serialize(value);
    this._store.setItem(key, raw);
  }

  remove(...keys: Key[]) {
    const key = this._key(keys)
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
        const normalizedKey = key.substring(this._baseKey.length + 1);
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


  private _key(keys: Key[], useBaseKey: boolean = true) {
    const part = keys.join(this._delemiter);
    return useBaseKey ? this._baseKey + this._delemiter + part : part;
  }

  static PROJECT_NAME = 'soliface';
}

export const MyStorage = new LocalStorageWrap();
export {}

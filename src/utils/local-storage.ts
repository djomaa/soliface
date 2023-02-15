export class LocalStorage {
  static get<T>(key: string): T | undefined {
    const raw = localStorage.getItem(key)
    if (raw === null) {
      return undefined;
    }
    const decoded = JSON.parse(raw)
    return decoded;
  }

  static put<T>(key: string, value: T) {
    const encoded = JSON.stringify(value)
    localStorage.setItem(key, encoded)
  }

  static remove(key: string) {
    localStorage.removeItem(key);
  }

  static update<T>(key: string, value: T) {
    if (value === undefined) {
      LocalStorage.remove(key);
    } else {
      LocalStorage.put(key, value);
    }
  }
}


export class EventEmitter {
  private readonly store = new Map<string, Function[]>()

  emit(key: string, toIgnore: Function) {
    if (!this.store.has(key)) {
      return
    }
    for (const fn of this.store.get(key)!) {
      if (fn === toIgnore) {
        continue
      }
      fn()
    }
  }

  on(key: string, listener: Function) {
    if (this.store.has(key)) {
      this.store.get(key)!.push(listener)
    } else {
      this.store.set(key, [listener])
    }
  }

  off(key: string, listener: Function) {
    const arr = this.store.get(key)
    if (arr == null) {
      throw new Error('No array found')
    }
    const clean = arr.filter((fn) => fn !== listener)
    if (clean.length === arr.length) {
      throw new Error('Listener not found')
    }
    this.store.set(key, clean)
  }
}

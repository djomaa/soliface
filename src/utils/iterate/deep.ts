
type NestedValue<T> = T extends object ? T[keyof T] : T;

type DeepIterateItem<T> = [path: (number | string)[], obj: NestedValue<T>];

export function deepIterate<T>(obj: unknown) {
  return deepIterateCore(obj, []);
}

export function* deepIterateCore<T>(obj: unknown, path: (string | number)[]): Generator<DeepIterateItem<T>, void, void> {
  if (!obj || typeof obj !== 'object') {
    yield [path, obj as any];
    return;
  }
  if (Array.isArray(obj)) {
    for (let i = 0; i < obj.length; i += 1) {
      yield* deepIterateCore(obj[i], [...path, i])
    }
  }
  for (const key in obj) {
    const value = obj[key as keyof typeof obj];
    yield* deepIterateCore(value, [...path, key]);
  }
}

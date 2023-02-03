export function objectToArray<T>(obj: Record<number, T>) {
  return Object.entries(obj).reduce((arr, [key, value]) => {
    const i = Number(key);
    arr[i] = value;
    return arr;
  }, [] as T[])
}

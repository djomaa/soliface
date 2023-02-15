export function buildObject<T>(obj: T, path: (number | string)[], value: any) {
  const root = path.reduce((acc, oKey, i) => {
    const key = oKey as keyof T;
    if (i === path.length) {
      console.log('')
      acc[key] = value;
      return acc;
    }
    return acc[key] as any;
  }, obj);
  return root;
}

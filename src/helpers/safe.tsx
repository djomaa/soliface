import { TypedFunction } from 'types/common';

export function safeJsonParse(obj: string) {
  try {
    const value = JSON.parse(obj);
    return [value];
  } catch (e) {
    return [undefined, e];
  }
}

export function safe<
  T extends TypedFunction,
>(
  fn: T,
  ...args: Parameters<T>
):
  [ReturnType<T>] | [undefined, Error] {
    try {
      const result = fn(...args);
      return [result];
    } catch (e) {
      return [undefined, e as Error];
    }
}

export function safeObj<
  T extends TypedFunction,
>(
  fn: T,
  ...args: Parameters<T>
):
  { result: ReturnType<T>, error: null } | { result: null, error: Error} {
    try {
      const result = fn(...args);
      return { result: result, error: null };
    } catch (e) {
      return { result: null, error: e as Error };
    }
}

export function safeValue<
  T extends TypedFunction
>(
  fn: TypedFunction,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  const [value, error] = safe(fn, ...args);
  console.log("🚀 ~ file: safe.tsx ~ line 34 ~ error", error)
  
  return value;
}

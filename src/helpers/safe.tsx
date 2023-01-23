import { TypedFunction } from 'types/common'

export function safeJsonParse (obj: string) {
  try {
    const value = JSON.parse(obj)
    return [value]
  } catch (e) {
    return [undefined, e]
  }
}

export function safe<
  T extends TypedFunction,
> (
  fn: T,
  ...args: Parameters<T>
):
  [ReturnType<T>] | [undefined, Error] {
  try {
    const result = fn(...args)
    return [result]
  } catch (e) {
    return [undefined, e as Error]
  }
}

export function safeObj<
  T extends TypedFunction,
> (
  fn: T,
  ...args: Parameters<T>
): { result: ReturnType<T>, error: null } | { result: null, error: Error } {
  try {
    const result = fn(...args)
    return { result, error: null }
  } catch (e) {
    return { result: null, error: e as Error }
  }
}

export function safeValue<
  T extends TypedFunction
> (
  fn: TypedFunction,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  const [value, error] = safe(fn, ...args)

  return value
}

export async function safeObjAsync<
  T extends TypedFunction,
> (
  fn: T,
  ...args: Parameters<T>
): Promise<{ result: ReturnType<T>, error: null } | { result: null, error: Error }> {
  try {
    const result = await fn(...args)
    return { result, error: null }
  } catch (e) {
    return { result: null, error: e as Error }
  }
}

export async function safeAsync<
  TErr extends object,
  TFn extends TypedFunction,
> (
  fn: TFn,
  ...args: Parameters<TFn>
):
  Promise<[undefined, Awaited<ReturnType<TFn>>] | [TErr, undefined]> {
  try {
    const result = await fn(...args)
    return [undefined, result]
  } catch (e) {
    return [e as TErr, undefined]
  }
}

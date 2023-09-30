import { TypedFunction } from 'types/common'

export function safeJsonParse(obj: string) {
  try {
    const value = JSON.parse(obj)
    return [value]
  } catch (e) {
    return [undefined, e]
  }
}

/**
 * @deprecated
 */
export function safeSync<
  T extends TypedFunction,
>(
  fn: T,
  ...args: Parameters<T>
):
  [undefined, ReturnType<T>] | [Error, undefined] {
  try {
    const result = fn(...args)
    return [undefined, result]
  } catch (e) {
    return [e as Error, undefined]
  }
}

/**
 * @deprecated
 */
export type SafeObj<T> = { result: T, error: null } | { result: null, error: Error };
/**
 * @deprecated
 */
export function safeObj<
  T extends TypedFunction,
>(
  fn: T,
  ...args: Parameters<T>
): SafeObj<ReturnType<T>> {
  try {
    const result = fn(...args)
    return { result, error: null }
  } catch (e) {
    return { result: null, error: e as Error }
  }
}

/**
 * @deprecated
 */
export function safeValue<
  TReturn,
  T extends TypedFunction<[], TReturn>
>(
  fn: TypedFunction,
  ...args: Parameters<T>
): ReturnType<T> | undefined {
  const [, value] = safeSync(fn, ...args)

  return value
}


/**
 * @deprecated
 */
export async function safeObjAsync<
  T extends TypedFunction,
>(
  fn: T,
  ...args: Parameters<T>
): Promise<{ result: Awaited<ReturnType<T>>, error: null } | { result: null, error: Error }> {
  try {
    const result = await fn(...args)
    return { result, error: null }
  } catch (e) {
    return { result: null, error: e as Error }
  }
}


/**
 * @deprecated
 */
export async function safe<
  TErr extends Error,
  TFn extends TypedFunction,
>(
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

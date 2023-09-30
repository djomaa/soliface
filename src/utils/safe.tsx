export async function safe<
  V,
  E = Error,
>(
  fn: () => (V | Promise<V>)
):
  Promise<[undefined, V] | [E, undefined]> {
  try {
    const result = await fn()
    return [undefined, result]
  } catch (e) {
    return [e as E, undefined]
  }
}

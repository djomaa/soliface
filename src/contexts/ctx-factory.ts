import { Context, useContext } from 'react'

export class NoCtxProviderError extends Error {
  constructor(ctx: Context<any> | string) {
    const name = typeof ctx === 'string' ? ctx : ctx.Provider.name;
    const msg = `No context provider found for ${name}`
    super(msg)
  }
}

export const createUseCtx = <T>(Ctx: Context<T | null>) => {
  return () => {
    const ctx = useContext(Ctx);
    if (ctx === null) {
      throw new NoCtxProviderError(Ctx);
    }
    return ctx;
  }
}

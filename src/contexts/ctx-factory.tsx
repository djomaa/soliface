import React, { Context, useContext } from 'react'

export class NoCtxProviderError extends Error {
  constructor(ctx: Context<any> | string) {
    const name = typeof ctx === 'string' ? ctx : ctx.Provider.name;
    const msg = `No context provider found for ${name}`
    super(msg)
  }
}

export const createUseCtx = <T,>(Ctx: Context<T | null>, ctxName: string) => {
  const useCtx = () => {
    const ctx = useContext(Ctx);
    if (!ctx) {
      throw new NoCtxProviderError(ctxName);
    }
    return ctx;
  }
  // eslint-disable-next-line react-hooks/rules-of-hooks
  useCtx.orEmpty = () => useContext(Ctx);
  return useCtx;
}

// export const withCtx = <TCompProps extends JSX.IntrinsicAttributes, TCtxProps>(CtxProvider: React.FC<React.PropsWithChildren<TCtxProps>>, Component: React.FC<TCompProps>) => {
//   const CompWithCtx: React.FC<{ ctxProps: TCtxProps, compProps: TCompProps }> = ({ ctxProps, compProps }) => {
//     return (
//       <CtxProvider {...ctxProps} >
//         <Component {...compProps} />
//       </CtxProvider>
//     )
//   }
//   return CompWithCtx;
// }

export const withCtx = <TCompProps extends JSX.IntrinsicAttributes, TCtxProps>(CtxProvider: React.FC<React.PropsWithChildren<TCtxProps>>, Component: React.FC<TCompProps>) => {
  const CompWithCtx: React.FC<TCtxProps & TCompProps> = (props) => {
    return (
      <CtxProvider {...props} >
        <Component {...props} />
      </CtxProvider>
    )
  }
  return CompWithCtx;
}

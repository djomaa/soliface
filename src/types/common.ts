export type TypedFunction<TArgs extends any[] = any[], TReturnType = any> = (...args: TArgs) => TReturnType

export interface SafeError {
  message: string
  details?: string
}

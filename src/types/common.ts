export type TypedFunction<TArgs extends any[] = any[], TReturnType = any> = (...args: TArgs) => TReturnType

export interface SafeError {
  message: string
  details?: string
}

export type StringifyAble = { toString(): string };

export type PartialRequired<T, K extends keyof T> = T & Required<Pick<T, K>>;

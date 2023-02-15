import React from 'react'

export interface IParentProps {
  children: React.ReactNode | React.ReactNode[];
}

// export type UseStateObject<TKey extends string, TType extends string | boolean | object | number> = {
export type UseStateObject<TKey extends string, TType> = {
  [key in TKey]: TType;
} & {
    [key in `set${Capitalize<TKey>}`]: React.Dispatch<React.SetStateAction<TType>>;
  }

export type PropsWithKey<P = unknown> = P & { key: React.Key };

export type ReactKeyedElement = React.ReactElement<PropsWithKey>;

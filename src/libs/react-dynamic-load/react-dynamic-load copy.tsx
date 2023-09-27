import React from 'react';
import { ComponentProps, ComponentType } from 'react';


// A is prefix between all type "functions"
// C - component
// FC - file content
// K - key

type PropertyKey = string;

type AAC = ComponentType<any>;
type AFactory<FC> = () => Promise<FC>;
type AFileContent<
  K extends PropertyKey,
  C
> = Record<K, C>;
type AGetter<FC, C> = (response: FC) => C;

type ParamsWithKey<
  C extends AAC,
  K extends PropertyKey = 'default',
  FC extends AFileContent<K, C> = AFileContent<K, C>
> = [
    factory: AFactory<FC>,
    key: K
  ]

type ParamsWithGetter<
  C, FC
// C extends AAC,
// FC extends object,
> = [
    factory: AFactory<FC>,
    getter: AGetter<FC, C>,
  ]

export function reactLazyComponent<
  Component extends AAC,
  Key extends PropertyKey,
  FileContent extends AFileContent<Key, Component>
>(
  ...params: ParamsWithKey<Component, Key, FileContent>
): React.LazyExoticComponent<Component>
export function reactLazyComponent<Component extends AAC, FileContent>(
  ...params: ParamsWithGetter<FileContent, Component>
): React.LazyExoticComponent<Component>;

export function reactLazyComponent<
  C extends AAC,
  K extends PropertyKey,
  FC extends AFileContent<K, C> = AFileContent<K, C>
>(
  ...params: ParamsWithGetter<C, FC> | ParamsWithKey<C, K, FC>
): React.LazyExoticComponent<C> {
  const { factory, getter, key } = parseParams(params);
  const wrappedFactory = getter ? applyGetter(factory, getter) : applyKey<C, K, FC>(factory, key);
  return React.lazy(wrappedFactory);
}

function applyGetter<C
  extends AAC,
  FC
>(factory: AFactory<FC>, getter: AGetter<FC, C>) {
  return () => factory().then((file) => {
    const result = getter(file);
    return { default: result };
  });
}

function applyKey<
  C extends AAC,
  K extends PropertyKey,
  FC extends AFileContent<K, C>
>(factory: AFactory<FC>, key: K): () => Promise<{ default: C }> {
  return () => factory().then((file) => {
    const result = file[key] as C; // TODO: try smth like `TK = PropertyKey` `TF = { [x: TK]: TC }`
    return { default: result };
  });
}

export function parseParams<
  C extends AAC,
  K extends PropertyKey,
  FC extends AFileContent<K, C>
>(
  params: ParamsWithGetter<C, FC> | ParamsWithKey<C, K, FC>
) {
  if (typeof params[1] === 'function') {
    const [factory, getter] = params;
    return { factory, getter };
  } else {
    const [factory, key] = params;
    return { factory, key };
  }
}

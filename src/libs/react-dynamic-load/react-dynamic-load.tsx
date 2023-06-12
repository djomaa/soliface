import React from 'react';


export type ReactLazyComponentParams<
  Component extends React.ComponentType<any>,
  Export extends Record<string, Component>,
  Key extends keyof Export,
> = [
    factory: () => Promise<Export>,
    key: Key,
  ]
export function reactLazyComponent<
  Component extends React.ComponentType<any>,
  Export extends Record<string, Component>,
  Key extends keyof Export,
>(
  factory: () => Promise<Export>,
  key: Key
): React.LazyExoticComponent<Export[Key]> {
  const wrappedFactory = () => factory().then((fileExport) => {
    const Component = fileExport[key];
    return { default: Component };
  })
  return React.lazy(wrappedFactory);
}

import React from 'react';
import { add, IModalProps } from './modal-container';
import { remove } from './modal-container';

export type Modal<T = {}> = React.FC<IModalProps & T>

let id = 0;
export function baseModal<T>(
  Component: React.FC<IModalProps & T>,
  props: T,
  basePropsOverrides?: (base: IModalProps) => IModalProps,
) {
  const cId = id++;
  let baseProps = {
    id: cId,
    onClose: () => remove(cId),
  }
  if (basePropsOverrides) {
    baseProps = basePropsOverrides(baseProps);
  }
  const element = (
    <Component
      {...props}
      {...baseProps}
      key={baseProps.id}
    />
  );
  add(element);
  return cId;
}


import { createUseCtx } from 'contexts/ctx-factory';
import React from 'react';
import { StringifyAble } from 'types/common';
import { UseStateObject } from 'types/react';

interface State extends
  UseStateObject<'inputsContainer', HTMLElement | undefined>,
  UseStateObject<'navContainer', HTMLElement | undefined>,
  UseStateObject<'active', string | undefined> {
  map: Map<string, React.RefObject<HTMLElement>>;
  register(labels: StringifyAble[], element: React.Ref<HTMLElement>): void;
}

const AbiInputsCtx = React.createContext<State | null>(null);

export const useAbiInputsCtx = createUseCtx(AbiInputsCtx, 'AbiInputsCtx');

export const AbiInputsCtxProvider: React.FC<React.PropsWithChildren> = ({ children }) => {

  const [map, setMap] = React.useState(new Map<string, React.RefObject<HTMLElement>>());

  const [list, setList] = React.useState<StringifyAble[][]>([]);
  const [active, setActive] = React.useState<string>();
  const [inputsContainer, setInputsContainer] = React.useState<HTMLElement>();
  const [navContainer, setNavContainer] = React.useState<HTMLElement>();

  const register = React.useCallback((labels: StringifyAble[], element: React.RefObject<HTMLElement>) => {
    // setElements((prev) => [...prev, element]);
    setMap((prev) => {
      const key = labels.join('.');
      const newMap = new Map(prev.entries());
      newMap.set(key, element);
      return newMap;
    })
    setList((prev) => [...prev, labels]);
  }, []);

  const value: State = {
    map,
    // elements: map,
    register,
    active,
    setActive,
    inputsContainer,
    setInputsContainer,
    navContainer, setNavContainer,
  }

  return (
    <AbiInputsCtx.Provider value={value}>
      {children}
    </AbiInputsCtx.Provider>
  )
}
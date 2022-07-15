import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAction } from 'hooks/use-async-action';
import { useForm, UseFormReturn } from 'react-hook-form';
import { AbiItem } from 'types/abi'
import { IMethodActionConf } from './types';

interface IMethodCtxState<T = IMethodActionConf> {
  abi: AbiItem;
  form: UseFormReturn<T>;
  action: IAction<string, [T]> | undefined;
  performAction: (action: IAction<string, [T]>, params: [T]) => void;
  setAction: (action: IAction<string, [T]>) => void;

}
export const MethodCtx = createContext<IMethodCtxState | null>(null);

export const useMethodCtx = () => {
  const ctx = useContext(MethodCtx);
  if (ctx === null) {
    throw new Error('useMethodContext must be used within a MethodContext');
  }
  return ctx;
}

interface iProps {
  abi: AbiItem;
  children: React.ReactNode | React.ReactNode[];
}

export const MethodCtxProvider: React.FC<iProps> = ({ abi, children }) => {
  const form = useForm<IMethodActionConf>({ defaultValues: { tx: {}, params: [] } });
  const [action, setAction] = useState<IAction<string>>();
  const performAction = (action: IAction<string>, params: any) => {
    setAction(action);
    action.perform(...params);
  }

  const value: IMethodCtxState = {
    abi,
    form,
    action,
    performAction,
    setAction,
  }
  return (
    <MethodCtx.Provider value={value}>
      {children}
    </MethodCtx.Provider>
  )

}

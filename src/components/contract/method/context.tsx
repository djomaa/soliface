import React, { createContext, useContext, useEffect, useState } from 'react';
import { IAction } from 'hooks/use-async-action';
import { useForm, UseFormReturn } from 'react-hook-form';
import { AbiItem } from 'types/abi'
import { IMethodActionConf } from './types';
import { useChainCtx } from 'contexts/web3';
import { useLogger } from 'hooks/use-logger';

// type IActionResult<T> = (action: )

interface IState<T = IMethodActionConf> {
  abi: AbiItem;
  form: UseFormReturn<T>;
  // action: IAction<string, [T]> | undefined;
  result?: JSX.Element;
  // updateAction: <R>(action: IAction<R, [T]>, handler: React.FC<{ action: IAction<R, [T]> }>) => void;
  setResult: (result: JSX.Element) => void;
}
export const MethodCtx = createContext<IState | null>(null);

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
  const [logger, { logState }] = useLogger(MethodCtxProvider);
  const chainCtx = useChainCtx();
  const form = useForm<IMethodActionConf>({ defaultValues: { tx: {}, params: [] } });
  // const [action, setAction] = useState<IAction<any>>();
  const [result, setResult] = useState<IState['result']>();
  // const updateAction = <R>(action: IAction<R>, handler: IState['Result']) => {

  logState('Result changed', result);

  useEffect(() => {
    if (!chainCtx.wallet) {
      return;
    }
    const { from } = form.getValues().tx;
    form.setValue('tx.from', chainCtx.account);
  }, [chainCtx.wallet, chainCtx.account])

  const value: IState = {
    abi,
    form,
    result,
    setResult,
  }
  return (
    <MethodCtx.Provider value={value}>
      {children}
    </MethodCtx.Provider>
  )

}

import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AbiItem } from 'types/abi';
import { UseStateObject } from 'types/react';
import { Arguments, TxConfForm } from './function.ctx-types';

export interface FunctionCtxState extends UseStateObject<'result', React.ReactElement | undefined> {
  abi: AbiItem;
  inputsForm: UseFormReturn<Arguments>;
  txConfForm: UseFormReturn<TxConfForm>;
}

export const FunctionCtx = React.createContext<FunctionCtxState | null>(null);

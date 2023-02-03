import React from 'react';
import { UseFormReturn } from 'react-hook-form';

import { AbiItem } from 'types/abi';
import { UseStateObject } from 'types/react';

import { ArgumentsObject, TxConfForm } from './function.ctx-types';

export interface FunctionCtxState extends UseStateObject<'result', React.ReactElement | undefined> {
  abi: AbiItem;
  inputsForm: UseFormReturn<ArgumentsObject>;
  txConfForm: UseFormReturn<TxConfForm>;
}

export const FunctionCtx = React.createContext<FunctionCtxState | null>(null);

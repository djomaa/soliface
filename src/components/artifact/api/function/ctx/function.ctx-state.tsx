import React from 'react';
import { UseFormReturn } from 'react-hook-form';
import { AbiItem } from 'types/abi';
import { InputsForm } from './function.ctx-types';

export interface FunctionCtxState {
  abi: AbiItem;
  inputsForm: UseFormReturn<InputsForm>;
}

export const FunctionCtx = React.createContext<FunctionCtxState | null>(null);

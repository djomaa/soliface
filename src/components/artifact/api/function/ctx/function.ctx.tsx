import React from 'react'
import { useForm } from 'react-hook-form';
import { AbiItem } from 'types/abi'

import { FunctionCtx, FunctionCtxState } from './function.ctx-state'
import { InputsForm } from './function.ctx-types';

interface IProps {
  abi: AbiItem;
}
export const FunctionCtxProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {

  const inputsForm = useForm<InputsForm>({ defaultValues: [] })

  const value: FunctionCtxState = {
    abi: props.abi,
    inputsForm,
  }

  return (
    <FunctionCtx.Provider value={value}>
      {props.children}
    </FunctionCtx.Provider>
  )

}

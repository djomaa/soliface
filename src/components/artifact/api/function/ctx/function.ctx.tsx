import React from 'react'
import { useForm } from 'react-hook-form';
import { AbiItem } from 'types/abi'

import { FunctionCtx, FunctionCtxState } from './function.ctx-state'
import { Arguments, TxConfForm } from './function.ctx-types';

interface IProps {
  abi: AbiItem;
}
export const FunctionCtxProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {

  const [result, setResult] = React.useState<React.ReactElement>()

  const inputsForm = useForm<Arguments>({
    defaultValues: [], resolver: (values, ctx, opts) => {
      console.log('resolver', { values, ctx, opts });
      return {
        values,
        errors: {},
      }
    }
  })
  const txConfForm = useForm<TxConfForm>({ defaultValues: {} })

  const value: FunctionCtxState = {
    abi: props.abi,
    inputsForm,
    txConfForm,
    result,
    setResult,
  }

  return (
    <FunctionCtx.Provider value={value}>
      {props.children}
    </FunctionCtx.Provider>
  )

}

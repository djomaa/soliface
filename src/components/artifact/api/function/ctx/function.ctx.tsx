import React from 'react'
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AbiItem } from 'types/abi'
import { useLogger } from 'hooks/use-logger';

import { createAbiItemSchema } from '../inputs/validation';
import { ArgumentsObject, TxConfForm } from './function.ctx-types';
import { FunctionCtx, FunctionCtxState } from './function.ctx-state'
import { useChainCtx } from 'contexts/chain';

interface IProps {
  abi: AbiItem;
}
type a = [string, ...string[]];
export const FunctionCtxProvider: React.FC<React.PropsWithChildren<IProps>> = ({ abi, children }) => {
  const Logger = useLogger(FunctionCtxProvider);
  const [result, setResult] = React.useState<React.ReactElement>()
  const { account } = useChainCtx();

  const inputsFormResolver = React.useMemo(() => {
    if (!abi.inputs) {
      return;
    }
    const schema = createAbiItemSchema(abi);
    // return yupResolver(schema);

    // @ts-ignore
    return (...args: any) => yupResolver(schema)(...args)
      .then(v => {
        console.log('Resolved', v);
        return v
      });
  }, [abi])

  const inputsForm = useForm<ArgumentsObject>({
    defaultValues: { params: [] },
    resolver: inputsFormResolver,
  })
  // console.log("🚀 ~ file: function.ctx.tsx:52 ~ values", values)
  const txConfForm = useForm<TxConfForm>({
    defaultValues: {
      from: account,
    }
  })

  React.useEffect(() => {
    const value = txConfForm.getValues('from');
    if (!value) {
      txConfForm.setValue('from', account);
    }
  }, [account, txConfForm]);

  const value: FunctionCtxState = {
    abi,
    inputsForm,
    txConfForm,
    result,
    setResult,
  }

  return (
    <FunctionCtx.Provider value={value}>
      {children}
    </FunctionCtx.Provider>
  )

}

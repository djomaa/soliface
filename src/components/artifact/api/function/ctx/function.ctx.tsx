import React from 'react'
import { Resolver, useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';

import { AbiItem } from 'types/abi'
import { useLogger } from 'hooks/use-logger';

import { createAbiItemSchema } from '../../../../abi-inputs/validation';
import { ArgumentsObject, TxConfForm } from './function.ctx-types';
import { FunctionCtx, FunctionCtxState } from './function.ctx-state'
import { useChainCtx } from 'contexts/chain';

interface IProps {
  abi: AbiItem;
}

export const FunctionCtxProvider: React.FC<React.PropsWithChildren<IProps>> = ({ abi, children }) => {
  const [Logger] = useLogger(FunctionCtxProvider);
  const [result, setResult] = React.useState<React.ReactElement>()
  const { account } = useChainCtx();

  const inputsFormResolver = React.useMemo(() => {
    const logger = Logger.sub('inputs-form');
    if (!abi.inputs) {
      return;
    }
    const schema = createAbiItemSchema(abi);
    // return yupResolver(schema);
    const resolver: Resolver<ArgumentsObject> = async (values, context, options) => {
      logger.debug('Resolving..', values);
      const result = await yupResolver(schema)(values, context, options);
      logger.debug('Resolved', result);
      return result;
    };
    return resolver;
  }, [abi]);

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

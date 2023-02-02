import React, { useMemo, useState } from 'react'

import Stack from '@mui/material/Stack'

import { TransactionConfig } from 'types/abi'
import { useChainCtx } from 'contexts/chain'

import { MethodInput } from '../inputs/base/base.input'
import { FormContainer } from 'react-hook-form-mui'
import { useFunctionCtx } from '../ctx'


import { Collapser } from '../collapser'
import { Child } from '../child'

type TxConfKey = keyof TransactionConfig


const TxConfTypeByKey: Partial<Record<TxConfKey, string>> = {
  from: 'address',
  value: 'uint256',
  gas: 'uint256',
  gasPrice: 'uint256',
  nonce: 'uint256'
}


export const TxConfCore: React.FC = (props) => {
  const { abi } = useFunctionCtx();
  const chainCtx = useChainCtx();

  const [open, setOpen] = useState(true)

  const fields = useMemo<TxConfKey[]>(() => {
    if (open) {
      return ['from', 'value', 'gas', 'gasPrice', 'nonce'];
    } else if (abi.stateMutability === 'payable') {
      return ['value'];
    } else {
      return [];
    }
  }, [abi, open]);

  // const defaultValues = useMemo(() => {
  //   const result: Partial<Record<TxConfKey, string>> = {};
  //   if (chainCtx.account) {
  //     result.from = chainCtx.account;
  //   }
  //   return result;
  // }, [chainCtx]);

  const inputs = useMemo(() => {
    return fields.map((key) => {
      return (
        <MethodInput
          key={key}
          name={key}
          position={[key]}
          path={[key]}
          type={TxConfTypeByKey[key]}
        // defaultValue={defaultValues[key]}
        />
      )
    })
  }, [fields])

  return (
    <Stack>
      {inputs}
    </Stack>
  )
}

export const TxConf: React.FC = (props) => {
  const [open, setOpen] = useState(false);
  const { txConfForm } = useFunctionCtx();

  return (
    <Collapser
      open={open}
      setOpen={setOpen}
      text='Transaction Configuration'
    >
      <Child x>
        <FormContainer formContext={txConfForm}>
          <TxConfCore />
        </FormContainer>
      </Child>
    </Collapser>
  )
}

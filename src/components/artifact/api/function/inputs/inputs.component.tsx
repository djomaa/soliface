import React from 'react';
import { FormContainer } from 'react-hook-form-mui';

import Stack from '@mui/material/Stack';

import { Child } from '../child';
import { useFunctionCtx } from '../ctx';
import { Collapser } from '../collapser';
import { ArgumentsObject } from '../ctx/function.ctx-types';
import { Input, InputPath, InputPosition } from './input.component';

interface IProps {
  // inputs: AbiInput[];
  path?: InputPath[];
  position?: InputPosition[];
}

const InputsCore: React.FC<IProps> = () => {
  const [open, setOpen] = React.useState(false);
  const { abi, inputsForm } = useFunctionCtx();

  const elements = React.useMemo(() => {
    const posPrefix: keyof ArgumentsObject = 'params'
    return abi.inputs?.map((input, i) => {
      return <Input key={input.name} input={input} position={[posPrefix, i]} path={[input.name]} />
    })
  }, [abi]);

  return (
    <Child x>
      <FormContainer formContext={inputsForm}>
        <Stack spacing={2}>
          {elements}
        </Stack>
      </FormContainer>
    </Child>
  );
}

export const Inputs: React.FC<IProps> = () => {
  const { abi } = useFunctionCtx();
  const hasInputs = !!abi.inputs && !!abi.inputs.length;
  const [open, setOpen] = React.useState(hasInputs);

  if (!hasInputs) {
    return <></>
  }

  return (
    <Collapser
      open={open}
      setOpen={setOpen}
      text='Arguments'
    >
      <InputsCore />
    </Collapser>
  )
}

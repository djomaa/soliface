import React from 'react';
import { useFunctionCtx } from '../ctx';
import Stack from '@mui/material/Stack';
import { Input } from './input.component';
import { FormContainer } from 'react-hook-form-mui';
import { Collapser } from '../collapser';
import { Child } from '../child';

interface IProps {
  // inputs: AbiInput[];
}

const InputsCore: React.FC<IProps> = () => {
  const [open, setOpen] = React.useState(false);
  const { abi, inputsForm } = useFunctionCtx();

  const elements = React.useMemo(() => {
    return abi.inputs?.map((input, i) => {
      return <Input key={input.name} input={input} position={[i]} path={[input.name]} />
    })
  }, [abi]);

  return (
    <Child x>
      <FormContainer formContext={inputsForm}>
        <Stack spacing={1}>
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

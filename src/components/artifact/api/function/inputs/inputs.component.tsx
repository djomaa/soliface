import React from 'react';
import { FormContainer } from 'react-hook-form-mui';



import { Child } from 'components/child';
import { AbiInputsContainer, useAbiInputs } from 'components/abi-inputs';

import { useFunctionCtx } from '../ctx';
import { Collapser } from '../collapser';


interface IProps {
}

const InputsCore: React.FC<IProps> = () => {
  const { abi, inputsForm } = useFunctionCtx();
  const inputs = useAbiInputs({ inputs: abi.inputs!, prefix: 'params' });

  return (
    <FormContainer formContext={inputsForm}>
      <Child x y>
        <AbiInputsContainer>
          {inputs}
        </AbiInputsContainer>
      </Child>
    </FormContainer>
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

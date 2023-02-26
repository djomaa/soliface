import React from 'react';
import { FormContainer } from 'react-hook-form-mui';



import { Child } from 'components/child';
import { AbiInputsComponent, useAbiInputs } from 'components/abi-input';

import { useFunctionCtx } from '../ctx';
import { Collapser } from '../collapser';


interface IProps {
}

const InputsCore: React.FC<IProps> = () => {
  const { abi, inputsForm } = useFunctionCtx();
  console.log("🚀 ~ file: inputs.component.tsx:18 ~ inputsForm", inputsForm)
  const inputs = useAbiInputs({ inputs: abi.inputs!, prefix: 'params' });

  return (
    <FormContainer formContext={inputsForm}>
      <Child x y>
        <AbiInputsComponent prefix='params' inputs={abi.inputs!} />
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

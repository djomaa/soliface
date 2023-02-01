import React from 'react';
import { useFunctionCtx } from '../ctx';
import Stack from '@mui/material/Stack';
import { Input } from './input.component';
import { FormContainer } from 'react-hook-form-mui';

interface IProps {
  // inputs: AbiInput[];
}

export const Inputs: React.FC<IProps> = () => {

  const { abi, inputsForm } = useFunctionCtx();

  const elements = React.useMemo(() => {
    return abi.inputs?.map((input, i) => {
      return <Input key={input.name} input={input} position={['params', i]} path={[input.name]} />
    })
  }, [abi]);

  return (
    <FormContainer formContext={inputsForm}>
      <Stack spacing={1}>
        {elements}
      </Stack>
    </FormContainer>
  );
}

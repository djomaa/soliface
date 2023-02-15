import React from 'react';


import { AbiInput } from 'types/abi';

import { AbiInputComponent } from './abi-input.component';

interface IProps {
  inputs: AbiInput[];
  /**
   * form name prefix
   */
  prefix: string;
}
export const useAbiInputs = ({ inputs, prefix }: IProps) => {

  const elements = React.useMemo(() => {
    return inputs.map((input, i) => {
      return <AbiInputComponent key={input.name} input={input} labels={[prefix, i]} path={[input.name]} />
    })
  }, [inputs, prefix]);

  return elements;
}

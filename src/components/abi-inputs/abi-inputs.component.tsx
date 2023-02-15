import React from 'react';

import { AbiInput } from 'types/abi';

import { AbiInputComponent } from './abi-input.component';
import { AbiInputsContainer } from './abi-inputs.container';

interface IProps {
  inputs: AbiInput[];
  /**
   * form name prefix
   */
  prefix: string;
}
export const AbiInputsComponent: React.FC<IProps> = ({ inputs, prefix }) => {

  const elements = React.useMemo(() => {
    return inputs.map((input, i) => {
      return <AbiInputComponent key={input.name} input={input} labels={[prefix, i]} path={[input.name]} />
    })
  }, [inputs, prefix]);

  return (
    <AbiInputsContainer>
      {elements}
    </AbiInputsContainer>
  )
}

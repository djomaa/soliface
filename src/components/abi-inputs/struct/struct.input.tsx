import React from 'react'

import { AbiInputComponent } from '../abi-input.component'
import { AbiInputWithChildren, PathAndLabelProps } from '../types'
import { AbiInputsContainer } from '../abi-inputs.container'
import { Label } from '../components/label'


export interface IProps extends PathAndLabelProps {
  input: AbiInputWithChildren;
}

export const MethodStructInput: React.FC<IProps> = ({ input, labels, path }) => {

  const children = input.components
    .map((input, i) => {
      const fLabels = [...labels, input.name]
      const fPath = [...path, i]
      return <AbiInputComponent
        key={input.name}
        input={input}
        path={fPath}
        labels={fLabels}
      />
    })


  return (
    <>
      <Label input={input} labels={labels} />
      <AbiInputsContainer>
        {children}
      </AbiInputsContainer>
    </>
  )
}

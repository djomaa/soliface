import React from 'react'

import { Path } from '../components/path'
import { AbiInputComponent } from '../abi-input.component'
import { AbiInputData } from '../components/abi-data'
import { AbiInputWithChildren, PathAndLabelProps } from '../types'
import { AbiInputsContainer } from '../abi-inputs.container'


export interface IProps extends PathAndLabelProps {
  input: AbiInputWithChildren;
}

export const MethodStructInput: React.FC<IProps> = ({ input, labels: position, path }) => {
  const children = input.components
    .map((input, i) => {
      const fLabels = [...position, i]
      const fPath = [...path, input.name]
      return <AbiInputComponent
        key={input.name}
        input={input}
        path={fPath}
        labels={fLabels}
      />
    })

  return (
    <AbiInputData
      headerTitle={<Path path={path} />}
      headerSubtitle={input.internalType}
      sx={{
        borderLeftStyle: 'solid',
      }}
    >
      <AbiInputsContainer>
        {children}
      </AbiInputsContainer>
    </AbiInputData>
  )
}

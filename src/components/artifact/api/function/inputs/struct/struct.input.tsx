import React from 'react'



import { Input, InputPath } from '../input.component'
import { AbiInputWithChildren } from '../types'
import { Path } from '../components/path'

import { AbiInputData } from '../components/abi-data/abi-data.component'

export interface iInputProps {
  input: AbiInputWithChildren;
  position: Array<string | number>
  path: InputPath[]
}

export const MethodStructInput: React.FC<iInputProps> = ({ input, position, path }) => {
  const children = input.components
    .map((input, i) => {
      const fPosition = [...position, i]
      const fPath = [...path, input.name]
      return <Input
        key={input.name}
        input={input}
        position={fPosition}
        path={fPath}
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
      {children}
    </AbiInputData>
  )
}

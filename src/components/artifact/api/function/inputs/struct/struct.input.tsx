import React from 'react'

import Box from '@mui/material/Box'


import { Input, InputPath } from '../input.component'
import style from './struct-input.module.scss'
import { MethodStructInputHeader } from './header'
import { AbiInputWithChildren } from '../types'

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
    <Box className={style.MethodStructInput}>
      <MethodStructInputHeader type={input.type} path={path} />
      <Box className={style.MethodStructInputBody}>
        {children}
      </Box>
    </Box >
  )
}

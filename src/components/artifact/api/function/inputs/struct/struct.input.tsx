import React from 'react'

import Box from '@mui/material/Box'

import { AbiInput } from 'types/abi'

import { Input, InputPath } from '../input.component'
import style from './struct-input.module.scss'
import { MethodStructInputHeader } from './header'

export interface iInputProps {
  position: Array<string | number>
  path: InputPath[]
  components: AbiInput[]
  defaultValue?: string
  type: string
}

export const MethodStructInput: React.FC<iInputProps> = ({ type, position, path, components }) => {
  const children = components
    .map((input, i) => {
      const fPosition = [...position, i]
      const fPath = [...path, input.name]
      return <Input input={input} position={fPosition} path={fPath} />
    })

  return (
    <Box className={style.MethodStructInput}>
      <MethodStructInputHeader type={type} path={path} />
      <Box className={style.MethodStructInputBody}>
        {children}
      </Box>
    </Box >
  )
}

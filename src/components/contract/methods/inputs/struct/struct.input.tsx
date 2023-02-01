import React from 'react'

import Box from '@mui/material/Box'

import { AbiInput } from 'types/abi'

import { parseInput } from '../parse'
import style from './struct-input.module.scss'
import { MethodStructInputHeader } from './header'

export interface iInputProps {
  position: Array<string | number>
  path: string[]
  components: AbiInput[]
  defaultValue?: string
  type: string
}

export const MethodStructInput: React.FC<iInputProps> = ({ type, position, path, defaultValue, components }) => {
  const inputs = components
    .map((input, i) => {
      const fPosition = [...position, i]
      const fPath = [...path, input.name]
      const inputs = parseInput(input, fPosition, fPath)
      return inputs
    })
    .flat()

  return (
    <Box className={style.MethodStructInput}>
      <MethodStructInputHeader type={type} path={path} />
      <Box className={style.MethodStructInputBody}>
        {inputs}
      </Box>
    </Box >
  )
}

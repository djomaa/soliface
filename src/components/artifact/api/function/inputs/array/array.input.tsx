import React, { useMemo } from 'react'
import { useCounter } from 'react-use'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import ButtonGroup from '@mui/material/ButtonGroup'

import { AbiInput } from 'types/abi'

import style from './array-input.module.scss'
import { ArrayInputHeader } from './header'
import { Input, InputPath, InputPosition } from '../input.component'
import assert from 'assert'

export interface iInputProps {
  input: AbiInput
  position: InputPosition[]
  path: InputPath[]
}
export const ARRAY_PATTERN = /\[(\d*)\]$/

function getArraySize(type: string) {
  const match = type.match(ARRAY_PATTERN);
  assert(match);
  return match[1] ? Number(match[1]) : undefined
}

function removeArrayLevel(input: AbiInput): AbiInput {
  return {
    ...input,
    type: input.type.replace(ARRAY_PATTERN, ''),
    internalType: input.internalType ? input.internalType.replace(ARRAY_PATTERN, '') : undefined,
  }
}

export const MethodArrayInput: React.FC<iInputProps> = ({ input, position, path }) => {
  // TODO: check input state change
  const size = getArraySize(input.type);
  const [count, { inc: incCount, dec: decCount }] = useCounter(size ?? 1, size ?? null, size ?? 1)

  const disabled = !!size
  let addRemove = (
    <ButtonGroup variant="text" size='small' >
      <IconButton onClick={() => { incCount() }} disabled={disabled}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => { decCount() }} disabled={disabled}>
        <RemoveIcon />
      </IconButton>
    </ButtonGroup>
  )

  if (disabled) {
    addRemove = (
      <Tooltip title='Array has strict size'>
        {addRemove}
      </Tooltip>
    )
  }

  const children = useMemo(() => {
    const subInput = removeArrayLevel(input);
    console.log("🚀 ~ file: array.input.tsx:66 ~ children ~ subInput", subInput, count)
    return Array.from({ length: count }, (_, i) => {
      console.log("🚀 ~ file: array.input.tsx:66 ~ children ~ gen", i)
      return (
        <Box key={i}>
          <Input
            input={subInput}
            position={[...position, i]}
            path={[...path, i]}
          />
        </Box >
      )
    })
  }, [count])

  return (
    <Box className={style.MethodArrayInput}>
      <ArrayInputHeader type={input.internalType ?? input.type} path={path} />
      <Box className={style.MethodArrayInputBody}>
        {addRemove}
        {children}
      </Box>
    </Box>
  )
}

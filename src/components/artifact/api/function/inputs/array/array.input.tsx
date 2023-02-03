import assert from 'assert'
import React, { useMemo } from 'react'
import { useCounter } from 'react-use'
import { TransitionGroup } from 'react-transition-group'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'

import { AbiInput } from 'types/abi'

import { ARRAY_PATTERN } from '../types'
import { AbiInputData } from '../components/abi-data'
import { Input, InputPath, InputPosition } from '../input.component'

export interface iInputProps {
  input: AbiInput
  position: InputPosition[]
  path: InputPath[]
}

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
  // TODO: check input props change
  const size = getArraySize(input.type);
  const [count, { inc: incCount, dec: decCount }] = useCounter(size ?? 1, size ?? null, size ?? 1)

  const disabled = !!size
  let addRemove = (
    <>
      <IconButton onClick={() => { incCount() }} disabled={disabled} size='small'>
        <AddIcon fontSize='small' />
      </IconButton>
      <IconButton onClick={() => { decCount() }} disabled={disabled} size='small'>
        <RemoveIcon fontSize='small' />
      </IconButton>
    </>
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
    return Array.from({ length: count }, (_, i) => {
      return (
        <Collapse in={true}>
          <Box key={i}>
            <Input
              input={subInput}
              position={[...position, i]}
              path={[...path, i]}
            />
          </Box >
        </Collapse>
      )
    })
  }, [count])

  return (
    <AbiInputData
      headerTitle={input.name}
      headerSubtitle={input.internalType}
      headerActions={addRemove}
      sx={{
        borderLeftStyle: 'dotted',
      }}
    >
      <TransitionGroup>
        {children}
      </TransitionGroup>
    </AbiInputData>
  )
}

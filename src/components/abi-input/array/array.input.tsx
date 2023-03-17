import assert from 'assert'
import React, { useMemo } from 'react'
import { useCounter } from 'react-use'
import { TransitionGroup } from 'react-transition-group'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import Collapse from '@mui/material/Collapse'
import RemoveIcon from '@mui/icons-material/Remove'

import { AbiInput } from 'types/abi'

import { AbiInputComponent } from '../abi-input.component'
import { ARRAY_PATTERN, PathAndLabelProps } from '../types'
import { ButtonGroup, IconButton } from '@mui/material'
import { Label } from '../components/label'

export interface IInputProps extends PathAndLabelProps {
  input: AbiInput
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

export const MethodArrayInput: React.FC<IInputProps> = ({ input, labels, path }) => {
  // TODO: check input props change
  const size = getArraySize(input.type);
  const [count, { inc: incCount, dec: decCount }] = useCounter(size ?? 1, size ?? null, size ?? 0)

  const disabled = !!size
  let addRemove = (
    <>
      <ButtonGroup
        size='small'
        color='inherit'
        variant='text'
        sx={{
          ':hover': {

          }
        }}
      >
        <IconButton
          size='small'
          onClick={() => incCount()}
        >
          <AddIcon fontSize='inherit' />
        </IconButton>
        <IconButton
          size='small'
          onClick={() => decCount()}
        >
          <RemoveIcon fontSize='inherit' />
        </IconButton>
      </ButtonGroup>
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
            <AbiInputComponent
              input={subInput}
              labels={[...labels, i]}
              path={[...path, i]}
            />
          </Box >
        </Collapse>
      )
    })
  }, [count])

  return (
    <>
      <Label input={input} action={addRemove} labels={labels} />
      <TransitionGroup>
        {children}
      </TransitionGroup>
    </>
  )
}


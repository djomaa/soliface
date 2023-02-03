import React, { useMemo } from 'react'
import { useCounter, useToggle } from 'react-use'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import ButtonGroup from '@mui/material/ButtonGroup'

import { AbiInput } from 'types/abi'

import style from './array-input.module.scss'
import { Input, InputPath, InputPosition } from '../input.component'
import assert from 'assert'
import Stack from '@mui/material/Stack'
import { Path } from '../components/path'
import Typography from '@mui/material/Typography'
import ArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowUp from '@mui/icons-material/KeyboardDoubleArrowUp';
import { Collapse } from '@mui/material'

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
  const [open, toggleOpen] = useToggle(true);
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
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        className={style.MethodArrayInputHeader}
      >
        {/* <PathBreadcrump
        path={path}
        typography={{ variant: 'subtitle2', color: 'text.primary' }}
      /> */}
        <Typography>
          <Path path={path} />
        </Typography>
        <ButtonGroup variant="text" size='small' >
          {addRemove}
          <IconButton size='small' onClick={toggleOpen}>
            {open ? <ArrowDown fontSize='small' /> : <ArrowUp fontSize='small' />}
          </IconButton>
        </ButtonGroup>
        <Typography>
          {input.internalType}
        </Typography>
      </Stack>
      <Collapse in={open}>
        <Box className={style.MethodArrayInputBody}>
          {children}
        </Box>
      </Collapse>
    </Box>
  )
}

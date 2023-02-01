import React, { useMemo } from 'react'
import { useCounter } from 'react-use'

import Box from '@mui/material/Box'
import Tooltip from '@mui/material/Tooltip'
import AddIcon from '@mui/icons-material/Add'
import IconButton from '@mui/material/IconButton'
import RemoveIcon from '@mui/icons-material/Remove'
import ButtonGroup from '@mui/material/ButtonGroup'

import { AbiInput } from 'types/abi'
import { useLogger } from 'hooks/use-logger'

import style from './array-input.module.scss'
import { ArrayInputHeader } from './header'
import { Input, InputPath, InputPosition } from '../input.component'

export interface iInputProps {
  type: string
  position: InputPosition[]
  path: InputPath[]
  components: AbiInput[]
  defaultValue?: string
  size: number | undefined
}

export const MethodArrayInput: React.FC<iInputProps> = ({ type, position, path, size, components }) => {
  const [count, { inc: incCount, dec: decCount }] = useCounter(size ?? 1, size ?? null, size ?? 1)
  const [logger] = useLogger(MethodArrayInput.name)

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
    logger.debug('Creating methods', { count, components })
    return Array.from({ length: count }, (_, i) => {
      const elements = components
        .map((component) => {
          const fPosition = [...position, i]
          const fPath = [...path, i]
          return <Input input={component} position={fPosition} path={fPath} />
        })
      return (
        <Box>
          {elements}
        </Box >
      )
    })
  }, [count])

  return (
    <Box className={style.MethodArrayInput}>
      <ArrayInputHeader type={type} path={path} />
      <Box className={style.MethodArrayInputBody}>
        {addRemove}
        {children}
      </Box>
    </Box>
  )
}

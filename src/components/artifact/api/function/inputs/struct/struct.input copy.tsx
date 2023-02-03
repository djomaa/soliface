import React from 'react'

import Box from '@mui/material/Box'


import { Input, InputPath } from '../input.component'
import style from './struct-input.module.scss'
import { AbiInputWithChildren } from '../types'
import { Collapse, IconButton, Stack, Typography } from '@mui/material'
import { useToggle } from 'react-use'
import { Path } from '../components/path'

import ArrowDown from '@mui/icons-material/KeyboardDoubleArrowDown';
import ArrowUp from '@mui/icons-material/KeyboardDoubleArrowUp';

export interface iInputProps {
  input: AbiInputWithChildren;
  position: Array<string | number>
  path: InputPath[]
}

export const MethodStructInput: React.FC<iInputProps> = ({ input, position, path }) => {
  const [open, toggleOpen] = useToggle(true);
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
      <Stack
        direction='row'
        justifyContent='space-between'
        alignItems='center'
        className={style.MethodStructInputHeader}
        onClick={toggleOpen}
      >
        {/* <PathBreadcrump
        path={path}
        typography={{ variant: 'subtitle2', color: 'text.primary' }}
      /> */}
        <Typography
          color='text.secondary'
        >
          <Path path={path} />
        </Typography>
        <Box>
          <IconButton size='small'>
            {open ? <ArrowDown fontSize='small' /> : <ArrowUp fontSize='small' />}
          </IconButton>
        </Box>
        <Typography
          // variant='subtitle2'
          color='text.secondary'
        >
          {input.internalType}
        </Typography>
      </Stack>
      <Collapse in={open}>
        <Box className={style.MethodStructInputBody}>
          {children}
        </Box>
      </Collapse>
    </Box >
  )
}

import React, { useMemo } from 'react';
import { useCounter } from 'react-use';

import Box from '@mui/material/Box';
import Tooltip from '@mui/material/Tooltip';
import AddIcon from '@mui/icons-material/Add';
import IconButton from '@mui/material/IconButton';
import RemoveIcon from '@mui/icons-material/Remove';
import ButtonGroup from '@mui/material/ButtonGroup';

import { AbiInput } from 'types/abi';
import { useLogger } from 'hooks/use-logger';

import { parseInput } from '../parse';
import style from './array-input.module.scss'
import { ArrayInputHeader } from './header';

export interface iInputProps {
  type: string;
  position: (string | number)[];
  path: string[];
  components: AbiInput[];
  defaultValue?: string;
  size: number | undefined;
}


export const MethodArrayInput: React.FC<iInputProps> = ({ type, position, path, defaultValue, size, components }) => {
  const [count, a] = useCounter(size ?? 1, size ?? null, size ?? 1);
  const [logger] = useLogger(MethodArrayInput.name);

  const disabled = !!size;
  let addRemove = (
    <ButtonGroup variant="text" size='small' >
      <IconButton onClick={() => a.inc()} disabled={disabled}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => a.dec()} disabled={disabled}>
        <RemoveIcon />
      </IconButton>
    </ButtonGroup>
  );

  if (disabled) {
    addRemove = (
      <Tooltip title='Array has strict size'>
        {addRemove}
      </Tooltip>
    )
  }

  const elements = useMemo(() => {
    logger.debug('Creating methods', { count, components });
    const a1 = Array.from({ length: count }, (_, i) => {
      const inputs = components
        .map((component) => {
          const fPosition = [...position, i];
          const fPath = [...path, i];
          const inputs = parseInput(component, fPosition, fPath);
          return inputs;
        })
      // .flat()
      return (
        <Box>
          {inputs}
        </Box >
      )
    })
    return a1.flat();

  }, [count]);


  return (
    <Box className={style.MethodArrayInput}>
      <ArrayInputHeader type={type} path={path} />
      <Box className={style.MethodArrayInputBody}>
        {addRemove}
        {elements}
      </Box>
    </Box>
  )
}

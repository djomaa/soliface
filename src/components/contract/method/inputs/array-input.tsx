import { Box, Breadcrumbs, BreadcrumbsTypeMap, Button, ButtonGroup, Divider, IconButton, Link, Stack, Tooltip, Typography, TypographyTypeMap } from '@mui/material';
import React, { useMemo, useState } from 'react';
import { TextFieldElement } from 'react-hook-form-mui';
import { useCounter } from 'react-use';
import { parseInput } from './parse';
import { AbiInput } from 'types/abi';
import { MethodInput } from './input';
import { useLogger } from 'hooks/use-logger';
import styles from 'styles/common.module.scss'
import { TypographyProps } from '@mui/system';
import AddIcon from '@mui/icons-material/Add';
import RemoveIcon from '@mui/icons-material/Remove';
import MoreHorizIcon from '@mui/icons-material/MoreHoriz';
import { PathBreadcrump } from './path-breadcrump';

export interface iInputProps {
  position: (string | number)[];
  path: string[];
  components: AbiInput[];
  defaultValue?: string;
  size: number | undefined;
}


export const MethodArrayInput: React.FC<iInputProps> = ({ position, path, defaultValue, size, components }) => {
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
        .map((component, j) => {
          const fPosition = [...position, i];
          const fPath = [...path, i];
          const inputs = parseInput(component, fPosition, fPath);
          return inputs;
        })
        .flat()
      return (
        <Box className={styles.ArrayInputItem}>
          <PathBreadcrump
            path={[...path, i]}
            breadcrumb={{ className: styles.ArrayInputHeader }}
            typography={{ variant: 'subtitle2', color: 'text.secondary' }}
          />
          {inputs}
        </Box >
      )
    })
    return a1.flat();

  }, [count]);


  return (
    <>
      <Box className={styles.ArrayInputBox}>
        <PathBreadcrump
          path={path}
          breadcrumb={{ className: styles.ArrayInputHeader }}
          typography={{ variant: 'subtitle2', color: 'text.primary' }}
        />
        {addRemove}
        {elements}
      </Box>
    </>
  )
}

import { Box, Breadcrumbs, BreadcrumbsTypeMap, Button, ButtonGroup, Divider, IconButton, Link, Stack, Typography, TypographyTypeMap } from '@mui/material';
import React, { useMemo } from 'react';
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
import { OverridableComponent, OverrideProps } from '@mui/material/OverridableComponent';

export interface iInputProps {
  position: (string | number)[];
  path: string[];
  components: AbiInput[];
  defaultValue?: string;
}

interface IBuildBreadcrumpOpts {
  breadcrumb?: OverrideProps<BreadcrumbsTypeMap, any>;
  typography?: TypographyTypeMap['props'];
}
function buildBreadcrump(items: any[], props?: IBuildBreadcrumpOpts) {
  return (
    <Breadcrumbs aria-label="breadcrumb" {...props?.breadcrumb}>
      {items.map((item) => <Typography {...props?.typography}>{item}</Typography>)}
    </Breadcrumbs>
  )
}

function preparePath(path: (string | number)[]) {
  return path.reduce((acc, item, i) => {
    const isFirst = i === 0;
    if (typeof item === 'string') {
      if (!isFirst) {
        acc += '.';
      }
      acc += item
    } else {
      acc += `[${item}]`
    }
    return acc;
  }, '')
}

export const MethodArrayInput: React.FC<iInputProps> = ({ position, path, defaultValue, components }) => {
  console.log("🚀 ~ file: array-input.tsx:33 ~ path", { position, path })

  const [count, a] = useCounter(1, null, 1);
  const [logger] = useLogger(MethodArrayInput.name);
  logger.debug('Count is', count)

  const addRemove = (
    <ButtonGroup variant="text" size='small'>
      <IconButton onClick={() => a.inc()}>
        <AddIcon />
      </IconButton>
      <IconButton onClick={() => a.dec()}>
        <RemoveIcon />
      </IconButton>
      {/* <Button onClick={() => a.inc()}>Add</Button>
      <Button onClick={() => a.dec()}>Remove</Button> */}
    </ButtonGroup>
    // <Stack direction="row">
    //   <Link
    //     variant='subtitle2'
    //     onClick={() => a.inc()}
    //   >
    //     Add
    //   </Link>

    //   <Link
    //     variant='subtitle2'
    //     onClick={() => a.dec()}
    //   >
    //     Remove
    //   </Link>
    // </Stack>
  );

  const elements = useMemo(() => {
    logger.debug('Creating methods', { count, components });
    const a1 = Array.from({ length: count }, (_, i) => {
      const inputs = components
        .map((component, j) => {
          const fPosition = [...position, i, j];
          const fPath = [...path, i];
          const inputs = parseInput(component, fPosition, fPath);
          return inputs;
        })
        .flat()
      return (
        <Box className={styles.ArrayInputItem}>
          {buildBreadcrump([...path, i], { breadcrumb: { className: styles.ArrayInputItemHeader }, typography: { variant: 'subtitle2', color: 'text.secondary' } })}
          {inputs}
        </Box >
      )
    })
    return a1.flat();

  }, [count]);


  return (
    <>
      <Box className={styles.ArrayInputBox}>
        {buildBreadcrump(path, { breadcrumb: { className: styles.ArrayInputHeader }, typography: { variant: 'subtitle2', color: 'text.primary' } })}
        {addRemove}
        {elements}
      </Box>
    </>
  )
}

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
import { PathBreadcrump } from './path-breadcrump';

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

export const MethodStructInput: React.FC<iInputProps> = ({ position, path, defaultValue, components }) => {
  console.log("🚀 ~ file: array-input.tsx:33 ~ path", { position, path })

  const [logger] = useLogger(MethodStructInput.name);

  const inputs = components
    .map((input, i) => {
      const fPosition = [...position, i];
      const fPath = [...path, input.name];
      const inputs = parseInput(input, fPosition, fPath);
      return inputs;
    })
    .flat()



  return (
    <>
      <Box className={styles.ArrayInputBox}>
        <PathBreadcrump
          path={path}
          breadcrumb={{ className: styles.ArrayInputHeader }}
          typography={{ variant: 'subtitle2', color: 'text.primary' }}
        />
        {inputs}
      </Box>
    </>
  )
}

import React from 'react';
import { Box } from '@mui/material';

import { AbiInput } from 'types/abi';
import styles from 'styles/common.module.scss';
import { PathBreadcrump } from './path-breadcrump';

import { parseInput } from './parse';

export interface iInputProps {
  position: (string | number)[];
  path: string[];
  components: AbiInput[];
  defaultValue?: string;
}

export const MethodStructInput: React.FC<iInputProps> = ({ position, path, defaultValue, components }) => {
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

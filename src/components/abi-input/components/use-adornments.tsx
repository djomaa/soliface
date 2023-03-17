import React from 'react';

import Stack from '@mui/material/Stack';
import InputAdornment, { InputAdornmentProps } from '@mui/material/InputAdornment'

import { ReactKeyedElement } from 'types/react';

export const useAdornments = (
  position: InputAdornmentProps['position'],
  ...elementOrElements: ReactKeyedElement[]
) => {
  if (!elementOrElements) {
    return;
  }
  const elements = Array.isArray(elementOrElements) ? elementOrElements : [elementOrElements];
  return (
    <InputAdornment
      position={position}
    >
      <Stack direction='row' spacing={0.5}>
        {elements}
      </Stack>
    </InputAdornment>
  )
}

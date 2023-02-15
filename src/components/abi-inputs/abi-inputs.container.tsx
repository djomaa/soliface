import React from 'react';

import Box from '@mui/material/Box';

import style from './abi-inputs.module.scss';

interface IProps {
}
export const AbiInputsContainer: React.FC<React.PropsWithChildren<IProps>> = ({ children }) => {

  return (
    <Box className={style.Container}>
      {children}
    </Box>
  )
}

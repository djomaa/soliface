import React from 'react';
import { useChainCtx } from 'contexts/web3'
import { Circle } from '@mui/icons-material';

export const State: React.FC = () => {
  const ctx = useChainCtx();

  if (!ctx.active && !ctx.error) {

    return (
      <Circle
        color='disabled'
      />
    )

  } else if (ctx.error) {
    return (
      <Circle
        color='error'
      />
    )
  } else {
    return (
      <Circle
        color='success'
      />
    )
  }
}

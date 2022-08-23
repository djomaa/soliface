import React from 'react';
import { useChainCtx } from 'contexts/web3'
import { Circle } from '@mui/icons-material';
import { Status } from 'contexts/web3/web3.context';
import { ComposedIcon } from 'components/composed-icon';
import { SvgIcon } from '@mui/material';

function getColorByStatus(status: Status) {
  switch (status) {
    case Status.NotConnected:
      return 'disabled';
    case Status.Failed:
      return 'error';
    case Status.Connected:
      return 'success';
    default:
      throw new Error(`${getColorByStatus.name}: Unknown status "${status}"`);
  }
}

export const State: React.FC = () => {
  const ctx = useChainCtx();
  const color = getColorByStatus(ctx.status);

  if (ctx.wallet) {
    const realColor = {
      disabled: 'gray',
      error: 'red',
      success: 'green',
    }
    console.log('wqeqweqw');
    console.log(realColor[color]);
    // console.log(<ctx.wallet.icon />);
    return (
      <>
        <SvgIcon
          inheritViewBox
          component={ctx.wallet.icon}
        />
      </>
    );
  }


  return (
    <Circle
      color={color}
    />
  )
}

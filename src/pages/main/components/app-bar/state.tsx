import React from 'react'

import CircleIcon from '@mui/icons-material/Circle'

import { useChainCtx, Status } from 'contexts/chain'

function getColorByStatus(status: Status) {
  switch (status) {
    case Status.NotConnected:
      return 'disabled'
    case Status.Failed:
      return 'error'
    case Status.Connected:
      return 'success'
    default:
      throw new Error(`${getColorByStatus.name}: Unknown status "${status}"`)
  }
}

export const State: React.FC = () => {
  const ctx = useChainCtx()
  const color = getColorByStatus(ctx.status)

  // if (ctx.wallet) {
  //   const realColor = {
  //     disabled: 'gray',
  //     error: 'red',
  //     success: 'green',
  //   }
  //   return (
  //     <>
  //       <SvgIcon
  //         inheritViewBox
  //         component={ctx.wallet.icon}
  //       />
  //     </>
  //   );
  // }

  return (
    <CircleIcon
      color={color}
    />
  )
}

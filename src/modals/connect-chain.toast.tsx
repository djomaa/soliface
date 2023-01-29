import React from 'react'
import { useAsync } from 'react-use'

import { Chain } from 'types/chain'
import { useChainCtx } from 'contexts/chain'

import { StateToast } from './base-toast/state.toast'


interface IProps {
  chain: Chain;
  onDone?: () => void;
  onClose?: () => void;
}

export const ConnectChainToast: React.FC<IProps> = ({ chain, ...props }) => {
  const chainCtx = useChainCtx()

  const state = useAsync(async () => {
    try {
      await chainCtx.changeChain(chain);
    } finally {
      if (props.onDone) {
        props.onDone();
      }
    }
    return true;
  }, [chainCtx.changeChain, chain]);

  return (
    <StateToast
      state={state}
      loadingText='Connecting chain..'
      errorText='Failed to connect chain'
      successText='Chain connected'
      onClose={props.onClose}
    />
  )
}

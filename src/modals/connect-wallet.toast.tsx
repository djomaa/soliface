import React from 'react'
import { useAsync } from 'react-use'


import { useChainCtx } from 'contexts/chain'
import { useLogger } from 'hooks/use-logger'
import { IWallet } from 'hooks/use-wallet-list'

import { StateToast } from './base-toast/state.toast'


interface IConnectWalletToastProps {
  wallet: IWallet;
  onClose?: () => void;
  onDone?: () => void;
}

export const ConnectWalletToast: React.FC<IConnectWalletToastProps> = ({ wallet, ...props }) => {
  const [Logger, { logState }] = useLogger(ConnectWalletToast.name, wallet.name)

  const chainCtx = useChainCtx()

  const state = useAsync(async () => {
    try {
      await chainCtx.connectWallet(wallet)
    } catch (error) {
      Logger.warn('Failure', error)
    } finally {
      if (props.onDone) {
        props.onDone();
      }
    }
  }, [chainCtx.changeChain, wallet])

  return (
    <StateToast
      state={state}
      loadingText={'Connecting wallet..'}
      successText={'Wallet connected'}
      errorText={'Failed to connect wallet'}
      onClose={props.onClose}
    />
  )

}

import { useAsync } from 'react-use'
import React from 'react'


import { AsyncModal } from 'contexts/modal'
import { useChainCtx } from 'contexts/chain'
import { useLogger } from 'hooks/use-logger'
import { IWallet } from 'hooks/use-wallet-list'
import { LoadingToast } from './base-toast/loading.toast-content'
import { SuccessToast } from './base-toast/success.toast-content'
import { ConnectWalletModal } from './connect-wallet-failure.modal'


interface IProps {
  wallet: IWallet
}

export const ConnectWalletToast: AsyncModal<IProps> = ({ wallet, ...props }) => {
  const [Logger, { logState }] = useLogger(ConnectWalletToast.name, wallet.name)

  const chainCtx = useChainCtx()

  const state = useAsync(async () => {
    await chainCtx.connectWallet(wallet)
  }, [chainCtx.changeChain, wallet])
  console.log("🚀 ~ file: connect-wallet.toast.tsx:26 ~ state ~ state", state)

  if (state.loading) {
    return <LoadingToast text='Connecting..' {...props} />
  }

  // if (state.error) {
  //   return <ErrorToast text='Failed to connect wallet' {...props} />
  // }

  if (state.error) {
    return <ConnectWalletModal title='Failed to connect wallet' error={state.error} {...props} />
  }

  return <SuccessToast text='Wallet connected' {...props} />
}

import { useCallback } from 'react'

import { useChainCtx } from 'contexts/chain'
import { IWallet } from 'hooks/use-wallet-list'

import { useLogger } from 'hooks/use-logger'
import { createStateToast } from 'modals/state.toast'


export const useConnectWalletAction = () => {
  const [Logger] = useLogger(useConnectWalletAction);

  const chainCtx = useChainCtx();

  const connectWallet = useCallback((wallet: IWallet) => {
    return createStateToast(() => chainCtx.connectWallet(wallet), {
      loading: 'Connecting wallet..',
      error: 'Failed to connect wallet',
      success: 'Wallet connected',
    }, Logger.sub(wallet.name));
  }, []);

  return { connectWallet };
}

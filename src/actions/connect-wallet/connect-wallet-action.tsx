import { toast, UpdateOptions } from 'react-toastify'
import React, { useCallback } from 'react'

import { safeAsync } from 'helpers/safe'
import { useChainCtx } from 'contexts/chain'
import { IWallet } from 'hooks/use-wallet-list'

import { FailureToastContent } from './failure-toast-content'
import { useLogger } from 'hooks/use-logger'


export const useConnectWalletAction = () => {
  const [Logger] = useLogger(useConnectWalletAction);

  const chainCtx = useChainCtx();


  const connectWallet = useCallback(async (wallet: IWallet) => {

    const toastId = toast.loading(`Connecting wallet..`, { type: 'info' });
    const [error] = await safeAsync<Error, () => Promise<void>>(() => chainCtx.connectWallet(wallet));
    const sharedOptions: UpdateOptions = {
      isLoading: false,
      closeButton: true,
    }
    if (error) {
      Logger.error('Failure', error);
      toast.update(toastId, {
        type: 'error',
        autoClose: false,
        ...sharedOptions,
        render: <FailureToastContent error={error} />,
      });
      return;
    }
    toast.update(toastId, {
      type: 'success',
      autoClose: 5e3,
      ...sharedOptions,
      render: 'Wallet connected',
    });
  }, []);

  return { connectWallet };
}

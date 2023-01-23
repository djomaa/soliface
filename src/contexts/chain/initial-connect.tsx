import React, { useEffect } from 'react';

import { useModalCtx } from 'contexts/modal';

import { useLogger } from 'hooks/use-logger';
import { useWalletStore } from 'hooks/use-wallet-store';
import { ConnectWalletToast } from 'modals/connect-wallet.toast';

export const InitialWalletConnect: React.FC = () => {
  const [Logger] = useLogger(InitialWalletConnect)

  const modalCtx = useModalCtx();

  const [wallet] = useWalletStore();

  useEffect(() => {
    const logger = Logger.sub('useEffect:[]')
    if (wallet) {
      logger.debug('Wallet was update in ')
      modalCtx.addModal(ConnectWalletToast, { wallet })
    }
  }, []);

  return (
    <></>
  )
}

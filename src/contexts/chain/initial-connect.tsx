import React, { useEffect, useState } from 'react';

import { useLogger } from 'hooks/use-logger';
import { useModal } from 'modals/modal-factory';
import { useWalletStore } from 'hooks/use-wallet-store';
import { ConnectWalletToast } from 'modals/connect-wallet.toast';
import { useConnectWalletAction } from 'actions/connect-wallet';

interface IProps {
  onClose: () => void;
  onDone: () => void;
}
export const InitialWalletConnectCore: React.FC<IProps> = (props) => {
  const [Logger] = useLogger(InitialWalletConnect)

  const [wallet] = useWalletStore();
  const { connectWallet } = useConnectWalletAction()

  const [toast, setToastProps] = useModal(ConnectWalletToast)

  useEffect(() => {
    const logger = Logger.sub('useEffect:[]')
    if (wallet) {
      logger.debug('Initital wallet', { wallet })
      connectWallet(wallet);
    } else {
      logger.debug('No initital wallet');
    }
  }, []);

  return (
    <>
    </>
  )
}

export const InitialWalletConnect: React.FC = () => {
  const [done, setDone] = useState(false);
  const [closed, setClosed] = useState(false);

  if (done && closed) {
    return <></>;
  }
  return <InitialWalletConnectCore onClose={() => setClosed(true)} onDone={() => setDone(true)} />

}

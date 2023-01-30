import React, { useEffect } from 'react';

import { useLogger } from 'hooks/use-logger';
import { useWalletStore } from 'hooks/use-wallet-store';
import { useConnectWalletAction } from 'actions/connect-wallet';
import { ChainCtxState } from './chain.ctx';

interface IProps {
  ctx: ChainCtxState;
}
export const InitialWalletConnect: React.FC<IProps> = (props) => {
  const [Logger] = useLogger(InitialWalletConnect)

  const [wallet] = useWalletStore();
  // const chainCtx = useChainCtx();
  const { connectWallet } = useConnectWalletAction()

  useEffect(() => {
    const logger = Logger.sub('useEffect:[]')
    Logger.debug('Current', props.ctx.wallet)
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

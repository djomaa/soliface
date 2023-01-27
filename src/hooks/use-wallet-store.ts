
import { useStore } from 'contexts/store';
import { useCallback, useMemo } from 'react';
import { IWallet, useWalletList } from './use-wallet-list'

export const useWalletStore = () => {
  const [walletName, oSet, remove] = useStore<string>(['wallet'])

  const { wallets } = useWalletList();

  const wallet = useMemo(() => {
    return wallets.find((w) => w.name === walletName);
  }, [walletName, wallets]);

  const set = useCallback((wallet: IWallet) => {
    oSet(() => wallet.name);
  }, [oSet]);

  return [wallet, set, remove] as const;
}

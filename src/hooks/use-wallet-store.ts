
import { useCallback, useMemo } from 'react';
// import { useStoreV1 } from './use-store-v1';
import { useStoreV2 } from './use-store-v2';
import { IWallet, useWalletList } from './use-wallet-list'

export const useWalletStore = () => {
  const [walletName, oSet, remove] = useStoreV2<string>(['wallet'])

  const { wallets } = useWalletList();

  const wallet = useMemo(() => {
    return wallets.find((w) => w.name === walletName);
  }, [walletName, wallets]);

  const set = useCallback((wallet: IWallet) => {
    oSet(() => wallet.name);
  }, [oSet]);

  return [wallet, set, remove] as const;
}


import { ChainCtxState, useChainCtx } from 'contexts/chain'

import { Chain } from 'types/chain'
import { createStateToast } from 'modals/state.toast'
import { Logger } from 'helpers/logger'
import { useCallback, useMemo } from 'react'


const addChainToWalletAction = async (chainCtx: ChainCtxState, chain: Chain) => {
  await createStateToast(() => chainCtx.addChain(chain), {
    loading: `Adding chain ${chain.chainId}..`,
    error: `Failed to add chain ${chain.chainId}`,
    success: `Chain added ${chain.chainId}`,
  }, new Logger(addChainToWalletAction.name));
}

export const useAddChainToWalletAction = () => {
  const chainCtx = useChainCtx();
  const addChainToWallet = useCallback((chain: Chain) => addChainToWalletAction(chainCtx, chain), []);
  return { addChainToWallet };
}

useAddChainToWalletAction.orEmpty = () => {
  const chainCtx = useChainCtx.orEmpty();
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const addChainToWallet = useMemo(() => {
    if (!chainCtx) {
      return;
    }
    return (chain: Chain) => addChainToWalletAction(chainCtx, chain);
  }, []);
  return { addChainToWallet };
}


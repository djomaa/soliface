import { useCallback } from 'react'

import { useChainCtx } from 'contexts/chain'

import { useLogger } from 'hooks/use-logger'
import { Chain } from 'types/chain'
import { useStoreCtx } from 'contexts/store'
import { useDefaultRpc } from 'hooks/use-default-rpc'
import { modal } from 'libs/modals'
import { SelectRpcModal } from './select-rpc.modal'
import { createStateToast } from 'modals/state.toast'


export const useConnectChainAction = () => {
  const [Logger] = useLogger(useConnectChainAction);
  const chainCtx = useChainCtx();
  const storeCtx = useStoreCtx();

  const connectChain = useCallback(async (chain: Chain) => {
    const storeKey = useDefaultRpc.generateKey(chain.chainId);
    let defaultRpc = storeCtx.getOriginalState(storeKey);
    if (!defaultRpc) {
      await modal.promise(SelectRpcModal, { chain });
    }
    defaultRpc = storeCtx.getOriginalState(storeKey);

    await createStateToast(() => chainCtx.changeChain(chain), {
      loading: 'Connecting chain..',
      error: 'Failed to connect chain',
      success: 'Chain connected',
    }, Logger);
  }, []);

  return { connectChain };
}

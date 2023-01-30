import { useCallback } from 'react'

import { useChainCtx } from 'contexts/chain'

import { useLogger } from 'hooks/use-logger'
import { Chain } from 'types/chain'
import { useStoreCtx } from 'contexts/store'
import { useDefaultRpc } from 'hooks/use-default-rpc'
import { modal } from 'libs/modals'
import { SelectRpcModal } from './select-rpc.modal'
import { createStateToast } from 'modals/state.toast'
import { toast } from 'react-toastify'


export const useChangeChainAction = () => {
  const [Logger] = useLogger(useChangeChainAction);
  const chainCtx = useChainCtx();
  const storeCtx = useStoreCtx();

  const changeChain = useCallback(async (chain: Chain) => {
    const storeKey = useDefaultRpc.key(chain.chainId);
    let defaultRpc = storeCtx.getOriginalState(storeKey);
    if (!defaultRpc) {
      defaultRpc = await modal.promise(SelectRpcModal, { chain });
    }
    if (!defaultRpc) {
      toast.info('Chain connection cancelled');
      return;
    }

    await createStateToast(() => chainCtx.changeChain(chain), {
      loading: `Connecting chain ${chain.chainId}..`,
      error: `Failed to connect chain ${chain.chainId}`,
      success: `Chain connected ${chain.chainId}`,
    }, Logger);
  }, []);

  return { changeChain };
}

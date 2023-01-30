import { useStore, useStoreKey } from 'contexts/store'
import { Chain } from 'types/chain'

const key = (chainId: Chain['chainId']) => {
  return useStoreKey.Pure('chain', 'rpc', chainId);
}

export const useDefaultRpc = (chainId: Chain['chainId']) => {
  return useStore<string>(key(chainId))
}

useDefaultRpc.key = key;

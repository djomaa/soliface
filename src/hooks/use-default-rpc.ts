import { useStore, useStoreKey } from 'contexts/store'
import { DepcrecatedChainType } from 'types/chain'

const key = (chainId: DepcrecatedChainType['chainId']) => {
  return useStoreKey.Pure('chain', 'rpc', chainId);
}

export const useDefaultRpc = (chainId: DepcrecatedChainType['chainId']) => {
  return useStore<string>(key(chainId))
}

useDefaultRpc.key = key;

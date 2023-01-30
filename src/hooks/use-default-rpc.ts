import { useStore } from 'contexts/store'
import { Chain } from 'types/chain'

// import { useStore } from './use-store'

const generateKey = (chainId: Chain['chainId']) => {
  return ['chain', 'rpc', chainId];
}

export const useDefaultRpc = (chainId: Chain['chainId']) => {
  return useStore<string>(generateKey(chainId))
}

useDefaultRpc.generateKey = (chainId: Chain['chainId']) => useStore.generateKey(generateKey(chainId));

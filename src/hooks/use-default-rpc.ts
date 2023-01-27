import { useStore } from 'contexts/store'
import { Chain } from 'types/chain'

// import { useStore } from './use-store'

export const useDefaultRpc = (chainId: Chain['chainId']) => {
  return useStore<string>(['chain', 'rpc', chainId])
}

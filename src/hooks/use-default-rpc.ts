import { useCallback, useMemo } from 'react';
import { Chain } from 'types/chain';

import { useRpcMap } from './use-rpc-map';
import { useStore } from './use-store';

// export const useDefaultRpc = (chainId: Chain['chainId']) => {
//   const rpcMap = useRpcMap();

//   const setRpc = useCallback((rpc: string) => {
//     return rpcMap.set(chainId, rpc);
//   }, [chainId]);

//   const rpc = useMemo(() => {
//     console.log('999 updated')
//     return rpcMap.get(chainId);
//   }, [rpcMap.store]);

//   return {
//     defaultRpc: rpc,
//     setDefaultRpc: setRpc,
//   };
// }

export const useDefaultRpc = (chainId: Chain['chainId']) => {
  return useStore(['chain', 'rpc', chainId]);
}

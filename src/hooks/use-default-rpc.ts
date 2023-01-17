import { useCallback } from 'react';
import { Chain } from 'types/chain';

import { useRpcMap } from './use-rpc-map';

export const useDefaultRpc = (chainId: Chain['chainId']) => {
  const rpcMap = useRpcMap();

  const setRpc = useCallback((rpc: string) => {
    return rpcMap.set(chainId, rpc);
  }, [chainId]);

  return {
    defaultRpc: rpcMap.get(chainId),
    setDefaultRpc: setRpc,
  };
}

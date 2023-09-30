import { QueryOptions, useQuery } from 'react-query';;

const url = 'https://chainid.network/chains.json';

export interface ChainListQuery {
  title?: string
  name: string
  icon?: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  infoURL: string
  networkId: number
  slip44?: number
  ens?: {
    registry: string
  }
  faucets: string[]
  chainId: number
  rpc: string[]
  shortName: string
  explorers?: Array<{
    name: string
    url: string
    standard: string
  }>
}

const chainListQuery: QueryOptions<ChainListQuery[]> = {
  queryKey: 'chain-list',
  queryFn: async () => {
    const result = await fetch(url);
    return result.json();
  },
  retry: false,
}

export const useChainListQuery = () => {
  return useQuery(chainListQuery);
}

import { QueryOptions, useQuery } from 'react-query';
import { Chain } from 'types/chain';

const url = 'https://chainid.network/chains.json';

const chainListQuery: QueryOptions<Chain[]> = {
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

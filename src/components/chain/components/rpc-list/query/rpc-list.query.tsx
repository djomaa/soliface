import { QueryOptions, useQueries } from 'react-query';
import { IData } from './constants';
import { fetchWsRpcData } from './ws.rpc';
import { fetchHttpRpcData } from './http.rpc';
import { useLogger } from 'hooks/use-logger';

export const useRpcListQuery = (urls: string[]) => {
  const queries = urls.map((url) => useRpcQuery(url));
  return useQueries(queries);
}

export const useRpcQuery = (url: string): QueryOptions<IData> => {
  const [Logger] = useLogger(useRpcQuery);
  Logger.debug('creating rpc query for url', url)
  const fn = getFetcher(url);
  return {
    queryKey: ['get-rpc-data', url],
    queryFn: () => fn(url),
    retry: false,
  }
}

export function getFetcher(oUrl: string) {
  const url = new URL(oUrl);
  switch (url.protocol) {
    case 'wss:':
    case 'ws:':
      return fetchWsRpcData;
    case 'http:':
    case 'https:':
      return fetchHttpRpcData;
    default:
      throw new Error(`${getFetcher.name}: unknow to determine type`);
  }
}

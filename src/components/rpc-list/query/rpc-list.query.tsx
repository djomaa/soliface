import { QueryOptions, useQueries } from 'react-query'

import { useLogger } from 'hooks/use-logger'

import { IData } from './constants'
import { fetchWsRpcData } from './ws.rpc'
import { fetchHttpRpcData } from './http.rpc'

export const useRpcListQuery = (urls: string[]) => {
  const queries = urls.map((url) => useRpcQuery(url))
  return useQueries(queries)
}

export const useRpcQuery = (url: string): QueryOptions<IData> => {
  const [Logger] = useLogger(useRpcQuery)
  Logger.debug('creating rpc query for url', url)
  const fn = getFetcher(url)
  return {
    queryKey: ['get-rpc-data', url],
    queryFn: async () => await fn(url),
    retry: false
  }
}

export function getFetcher (oUrl: string) {
  const url = new URL(oUrl)
  switch (url.protocol) {
    case 'wss:':
    case 'ws:':
      return fetchWsRpcData
    case 'http:':
    case 'https:':
      return fetchHttpRpcData
    default:
      throw new Error(`${getFetcher.name}: unknow to determine type`)
  }
}

import { Chain } from 'contexts/db/schema/chain';
import { safe } from 'utils/safe';

const url = 'https://chainid.network/chains.json';

export interface ChainListItem {
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

export async function fetchChains(): Promise<Chain.DocType[]> {
  const response = await fetch(url).catch((cause) => { throw new Error('Fetch error', { cause }) });
  const [parseError, oChains] = await safe<ChainListItem[]>(() => response.json());
  if (parseError) {
    throw new Error('Response is not a JSON', { cause: parseError });
  }
  const [mapError, chains] = await safe(() => oChains.map((src) => {
    const document: Chain.DocType = {
      id: src.chainId.toString(),
      chainId: src.chainId,
      name: src.name,
      shortName: src.shortName,
      rpc: src.rpc,
      infoUrl: src.infoURL,
      nativeCurrency: src.nativeCurrency,
      icon: src.icon,
      faucets: src.faucets,
      ens: src.ens,
      explorers: src.explorers,
    };
    return document;
  }));
  if (mapError) {
    throw new Error('Response has invalid format', { cause: mapError });
  }
  return chains;
}


export interface IExplorer {
  name: string
  url: string
  standard: string
}

export interface Chain {
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
  explorers?: IExplorer[]
}

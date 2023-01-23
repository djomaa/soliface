import { Chain } from 'types/chain'

export interface ISwitchChainConnector {
  setChain: (chain: Chain) => Promise<void>
}

export interface IAddChainConnector {
  addChain: (chain: Chain) => Promise<void>
}

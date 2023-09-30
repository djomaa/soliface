import { DepcrecatedChainType } from 'types/chain'

export interface ISwitchChainConnector {
  setChain: (chain: DepcrecatedChainType) => Promise<void>
}

export interface IAddChainConnector {
  addChain: (chain: DepcrecatedChainType) => Promise<void>
}

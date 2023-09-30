import detectEthereumProvider from '@metamask/detect-provider'
import { AbstractConnectorArguments } from '@web3-react/types'
import { InjectedConnector, NoEthereumProviderError } from '@web3-react/injected-connector'

import { DepcrecatedChainType } from 'types/chain'
import { numberToHex } from 'utils/number.utils'

import { ISwitchChainConnector } from '../interafaces'

export class ProviderInitializationNotFinishedError {
}

type SwitchEthereumChainParameters = [{ chainId: string }]
type AddEthereumChainParameter = [{
  chainId: string
  chainName: string
  nativeCurrency: {
    name: string
    symbol: string
    decimals: number
  }
  rpcUrls: string[]
  blockExplorerUrls?: string[]
  iconUrls?: string[]
}]

const METAMASK_ERROR_CHAIN_NOT_FOUND = 4902

interface IEthereum {
  // request(args: { method: string, params?: unknown[] | object }): Promise<unknown>;
  request: ((args: { method: 'wallet_switchEthereumChain', params: SwitchEthereumChainParameters }) => Promise<null>) & ((args: { method: 'wallet_addEthereumChain', params: AddEthereumChainParameter }) => Promise<null>)
}

export class MetaMaskConnector extends InjectedConnector implements ISwitchChainConnector {
  _providerPromise = detectEthereumProvider<IEthereum>().then((result) => {
    this._provider = result
  })

  _provider: IEthereum | null | undefined

  get provider() {
    if (this._provider === undefined) {
      throw new ProviderInitializationNotFinishedError()
    }
    if (this._provider === null) {
      throw new NoEthereumProviderError()
    }
    return this._provider
  }

  constructor(opts: AbstractConnectorArguments) {
    super(opts)
  }

  async setChain(chain: DepcrecatedChainType) {
    const hexChainId = numberToHex(chain.chainId)

    try {
      await this.provider.request({
        method: 'wallet_switchEthereumChain',
        params: [{ chainId: hexChainId }]
      })
    } catch (error: any) {
      if (error.code !== METAMASK_ERROR_CHAIN_NOT_FOUND) {
        throw error
      }
      await this.addChain(chain)
    }
  }

  async addChain(chain: DepcrecatedChainType) {
    const hexChainId = numberToHex(chain.chainId)
    await this.provider.request({
      method: 'wallet_addEthereumChain',
      params: [{
        chainId: hexChainId,
        chainName: chain.name,
        nativeCurrency: chain.nativeCurrency,
        rpcUrls: chain.rpc,
        blockExplorerUrls: chain.explorers?.map(({ url }) => url)
      }]
    })
  }
}

import { WalletConnectConnector } from '@web3-react/walletconnect-connector'

import { MetamaskIcon } from 'media/metamask'
import { WalletConnectIcon } from 'media/walletconnect'
import { useState } from 'react'

import { MetaMaskConnector } from './connectors/metamask.connector'

export interface IWallet {
  icon: any
  name: string
  connector: any
}

const Wallets: Readonly<IWallet>[] = [
  {
    name: 'MetaMask',
    connector: new MetaMaskConnector({}),
    icon: MetamaskIcon
  },
  {
    name: 'WalletConnect',
    connector: new WalletConnectConnector({}),
    icon: WalletConnectIcon
  },
]

export const useWalletList = () => {
  const [wallets] = useState<IWallet[]>(Wallets)
  return { wallets }
}

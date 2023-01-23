import Web3 from 'web3'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { NetworkConnector } from '@web3-react/network-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import React, { createContext, useCallback, useEffect, useMemo } from 'react'

import { Chain } from 'types/chain'
import { useStore } from 'hooks/use-store'
import { useLogger } from 'hooks/use-logger'
import { IWallet, useWalletList } from 'hooks/use-wallet-list/use-wallet-list'
import { IAddChainConnector, ISwitchChainConnector } from 'hooks/use-wallet-list'

export enum Status {
  NotConnected,
  Failed,
  Connected,
}

function getLibrary(provider: any) {
  const library = new Web3(provider)
  return library
}

function canConnectorChainBeSwitched<T extends AbstractConnector>(connector: T): connector is T & ISwitchChainConnector {
  const tConnector = connector as Partial<ISwitchChainConnector>
  return !(tConnector.setChain == null)
}

function canConnectorChainBeAdded<T extends AbstractConnector>(connector: T): connector is T & IAddChainConnector {
  const tConnector = connector as Partial<IAddChainConnector>
  return !(tConnector.addChain == null)
}

interface IState {
  changeChain: (chain: Chain) => void
  addChain: (chain: Chain) => Promise<void>
  connectWallet: (wallet: IWallet) => void
  disconnect: () => void
  wallet: IWallet | null
  chainId: number | null
  web3: Web3
  status: Status
  account: string
  canSwitchChain: boolean | null
  canAddChain: boolean | null
}
export const Web3Ctx = createContext<IState | null>(null)

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}
export const Web3CtxProvider: React.FC<IProps> = (props) => {
  const [Logger] = useLogger(Web3CtxProvider)
  const ctx = useWeb3React()
  const { wallets } = useWalletList()
  const WalletStorage = useStore.object(['wallet'])

  const connect = useCallback(async (wallet: IWallet) => {
    await ctx.activate(wallet.connector)
  }, [])

  const disconnect = useCallback(() => {
    ctx.deactivate()
  }, [])

  const status = useMemo(() => {
    if (!ctx.active && (ctx.error == null)) {
      return Status.NotConnected
    }
    if (ctx.error != null) {
      return Status.Failed
    }
    return Status.Connected
  }, [ctx.active, ctx.error])

  const wallet = useMemo(() => {
    const logger = Logger.sub('useMemo', 'wallet')
    logger.debug('Started', { connector: ctx.connector })
    // TODO?: wallet can be deleted from wallet list
    if (ctx.connector == null) {
      logger.debug('Empty connector, so null')
      return null
    }

    logger.debug('Checking list', { wallets })
    const wallet = wallets.find((w) => {
      return w.connector === ctx.connector
    })

    if (wallet == null) {
      logger.debug('Wallet not found, so null')
      return null
    }

    logger.log('Wallet updated', wallet)
    return wallet
  }, [ctx.connector, wallets])

  useEffect(() => {
    if (wallet != null) {
      WalletStorage.set(wallet.name)
    } else {
      WalletStorage.remove()
    }
  }, [wallet])

  const canSwitchChain = useMemo(() => {
    const logger = Logger.sub('useMemo:canSwitchChain')
    logger.debug('Started', ctx.connector)
    if (ctx.connector == null) {
      logger.debug('Empty connector, so null')
      return null
    }
    const result = canConnectorChainBeSwitched(ctx.connector)
    logger.log('Updated', result)
    return result
  }, [ctx.connector])

  const canAddChain = useMemo(() => {
    const logger = Logger.sub('useMemo:canAddChain')
    logger.debug('Started', ctx.connector)
    if (ctx.connector == null) {
      logger.debug('Empty connector, so null')
      return null
    }
    const result = canConnectorChainBeAdded(ctx.connector)
    logger.log('Updated', result)
    return result
  }, [ctx.connector])

  const changeChain = useCallback((chain: Chain) => {
    const logger = Logger.sub('changeChain')
    logger.debug('Changing chain', { chain, wallet })
    if (wallet != null) {
      logger.debug('Wallet provided')
      if (ctx.connector == null) {
        throw new Error('connector is empty')
      }
      if (!canConnectorChainBeSwitched(ctx.connector)) {
        throw new Error('Connector is not switchable')
      }
      logger.debug('Calling connector.setChainId')
      return ctx.connector.setChain(chain)
      // .catch((error) => {
      //   logger.error(error);
      //   return;
      // })
    }
    logger.debug('Create NetworkConnector')
    const connector = new NetworkConnector({ urls: { [chain.chainId]: chain.rpc[0] } })
    return ctx.activate(connector)
  }, [wallet])

  const addChain = async (chain: Chain) => {
    const logger = Logger.sub('changeChain')
    logger.debug('Adding chain', { chain, wallet })
    if (ctx.connector == null) {
      throw new Error('connector is empty')
    }
    if (wallet == null) {
      throw new Error('wallet is not connected')
    }
    if (!canAddChain) {
      throw new Error('canAddChain is false')
    }
    if (!canConnectorChainBeAdded(ctx.connector)) {
      throw new Error('connector is not chainSwitchable')
    }
    await ctx.connector.addChain(chain)
  }

  useEffect(() => {
    const logger = Logger.sub('useEffect:[]')
    const walletName = WalletStorage.value
    logger.debug('Initial connector', { walletName })
    if (walletName) {
      const wallet = wallets.find((w) => w.name === walletName)
      if (wallet == null) {
        logger.debug('Wallet not found')
        return
      }
      connect(wallet)
    }
  }, [])

  const value: IState = {
    status,
    connectWallet: connect,
    disconnect,
    web3: ctx.library as Web3,
    wallet,
    account: ctx.account ?? '',
    chainId: ctx.chainId ?? null,
    changeChain,
    addChain,
    canSwitchChain,
    canAddChain
  }

  return (
    <Web3Ctx.Provider value={value}>
      {props.children}
    </Web3Ctx.Provider>
  )
}

export const ChainCtxProvider: React.FC<any> = (props) => {
  return (
    <Web3ReactProvider
      getLibrary={getLibrary}
    >
      <Web3CtxProvider {...props} />
    </Web3ReactProvider>
  )
}

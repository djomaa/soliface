import Web3 from 'web3'
import { NetworkConnector } from '@web3-react/network-connector'
import { AbstractConnector } from '@web3-react/abstract-connector'
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import React, { createContext, useCallback, useMemo } from 'react'

import { Chain } from 'types/chain'
import { IParentProps } from 'types/react'
import { useLogger } from 'hooks/use-logger'
import { ChainCtxAnalytics } from 'contexts/analytics'
import { useWalletStore } from 'hooks/use-wallet-store'
import { InitialWalletConnect } from './initial-connect'
import { IWallet, useWalletList, IAddChainConnector, ISwitchChainConnector } from 'hooks/use-wallet-list'

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

export interface ChainCtxState {
  changeChain: (chain: Chain) => Promise<void>
  addChain: (chain: Chain) => Promise<void>
  connectWallet: (wallet: IWallet) => Promise<void>
  disconnect: () => void
  wallet: IWallet | null
  chainId: number | null
  web3: Web3
  status: Status
  account: string
  canSwitchChain: boolean | null
  canAddChain: boolean | null
}
export const ChainCtx = createContext<ChainCtxState | null>(null)

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}
export const ChainCtxProviderCore: React.FC<IProps> = (props) => {
  const [Logger] = useLogger(ChainCtxProviderCore)
  const ctx = useWeb3React()
  const { wallets } = useWalletList()
  const [, storeWallet, clearWallet] = useWalletStore();

  const connect = useCallback(async (wallet: IWallet) => {
    const logger = Logger.sub('connect-wallet');
    logger.debug('Start', wallet);
    await ctx.activate(wallet.connector, undefined, true)
    storeWallet(wallet);
  }, [ctx, storeWallet])

  const disconnect = useCallback(() => {
    const logger = Logger.sub('disconnect-wallet');
    logger.debug('Start');
    ctx.deactivate()
    clearWallet();
  }, [ctx, clearWallet])

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



  const value: ChainCtxState = {
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
    <ChainCtx.Provider value={value}>
      <ChainCtxAnalytics />
      <InitialWalletConnect />
      {props.children}
    </ChainCtx.Provider>
  )
}

export const ChainCtxProvider: React.FC<IParentProps> = (props) => {
  return (
    <Web3ReactProvider
      getLibrary={getLibrary}
    >
      <ChainCtxProviderCore {...props} />
    </Web3ReactProvider>
  )
}

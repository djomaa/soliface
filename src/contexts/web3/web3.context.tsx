import Web3 from 'web3';
import { useSearchParams } from 'react-router-dom';
import { Web3ReactProvider, useWeb3React } from '@web3-react/core'
import { NetworkConnector } from '@web3-react/network-connector'
import { AbstractConnector } from '@web3-react/abstract-connector';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';

import { Chain } from 'types/chain';
import { useChainList } from 'hooks/use-chain-list';
import { IWallet, useWalletList } from 'hooks/use-wallet-list/use-wallet-list';
import Web3Provider from 'web3-react';
import { InjectedConnector } from '@web3-react/injected-connector'
import { useLogger } from 'hooks/use-logger';
import { IAddChainConnector, ISwitchChainConnector } from 'hooks/use-wallet-list';
import { safe, safeAsync } from 'helpers/safe';
import { LocalStorageWrap } from 'hooks/use-local-storage';

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
  const tConnector = connector as Partial<ISwitchChainConnector>;
  return !!tConnector.setChain;
}

function canConnectorChainBeAdded<T extends AbstractConnector>(connector: T): connector is T & IAddChainConnector {
  const tConnector = connector as Partial<IAddChainConnector>;
  return !!tConnector.addChain;
}

const WalletStorage = new LocalStorageWrap('wallet');

interface IState {
  changeChain(chain: Chain): void;
  addChain(chain: Chain): Promise<void>;
  connectWallet(wallet: IWallet): void;
  disconnect(): void;
  wallet: IWallet | null;
  chainId: number | null;
  web3: Web3;
  status: Status;
  account: string;
  canSwitchChain: boolean | null;
  canAddChain: boolean | null;
}
export const Web3Ctx = createContext<IState | null>(null);

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}
export const Web3CtxProvider: React.FC<IProps> = (props) => {
  const [Logger] = useLogger(Web3CtxProvider);
  const ctx = useWeb3React();
  const { wallets } = useWalletList();

  const connect = useCallback((wallet: IWallet) => {
    ctx.activate(wallet.connector);
  }, []);

  const disconnect = useCallback(() => {
    ctx.deactivate();
  }, []);

  const status = useMemo(() => {
    if (!ctx.active && !ctx.error) {
      return Status.NotConnected;
    }
    if (ctx.error) {
      return Status.Failed;
    }
    return Status.Connected;
  }, [ctx.active, ctx.error]);

  const wallet = useMemo(() => {
    const logger = Logger.sub('useMemo', 'wallet');
    logger.debug('Started', { connector: ctx.connector });
    // TODO?: wallet can be deleted from wallet list
    if (!ctx.connector) {
      logger.debug('Empty connector, so null');
      return null;
    }

    logger.debug('Checking list', { wallets });
    const wallet = wallets.find((w) => {
      return w.connector === ctx.connector;
    });

    if (!wallet) {
      logger.debug('Wallet not found, so null');
      return null;
    }

    WalletStorage.set(wallet.name);
    logger.log('Wallet updated', wallet);
    return wallet;
  }, [ctx.connector, wallets]);

  const canSwitchChain = useMemo(() => {
    const logger = Logger.sub('useMemo:canSwitchChain');
    logger.debug('Started', ctx.connector);
    if (!ctx.connector) {
      logger.debug('Empty connector, so null');
      return null;
    }
    const result = canConnectorChainBeSwitched(ctx.connector);
    logger.log('Updated', result);
    return result;
  }, [ctx.connector]);

  const canAddChain = useMemo(() => {
    const logger = Logger.sub('useMemo:canAddChain');
    logger.debug('Started', ctx.connector);
    if (!ctx.connector) {
      logger.debug('Empty connector, so null');
      return null;
    }
    const result = canConnectorChainBeAdded(ctx.connector);
    logger.log('Updated', result);
    return result;
  }, [ctx.connector]);

  const changeChain = (chain: Chain) => {
    const logger = Logger.sub('changeChain');
    logger.debug('Changing chain', { chain, wallet });
    if (wallet) {
      logger.debug('Wallet provided');
      if (!ctx.connector) {
        logger.error(new Error('connector is empty'));
        return;
      }
      if (!canConnectorChainBeSwitched(ctx.connector)) {
        logger.error(new Error('connector is not chainSwitchable'), { connector: ctx.connector });
        return;
      }
      logger.debug('Calling connector.setChainId');
      ctx.connector.setChain(chain)
        .catch((error) => {
          logger.error(error);
          return;
        })
      return;
    }

    logger.debug('Create NetworkConnector');
    const connector = new NetworkConnector({ urls: { [chain.chainId]: chain.rpc[0] } });
    ctx.activate(connector);
  }

  const addChain = (chain: Chain) => {
    const logger = Logger.sub('changeChain');
    logger.debug('Adding chain', { chain, wallet });
    if (!ctx.connector) {
      throw new Error('connector is empty');
    }
    if (!wallet) {
      throw new Error('wallet is not connected');
    }
    if (!canAddChain) {
      throw new Error('canAddChain is false');
    }
    if (!canConnectorChainBeAdded(ctx.connector)) {
      throw new Error('connector is not chainSwitchable');
    }
    return ctx.connector.addChain(chain);
  }

  useEffect(() => {
    const logger = Logger.sub('useEffect:[]')
    const walletName = WalletStorage.get();
    logger.debug('Initial connector', { walletName });
    if (walletName) {
      const wallet = wallets.find((w) => w.name === walletName);
      if (!wallet) {
        logger.debug('Wallet not found');
        return;
      }
      connect(wallet);
    }
  }, []);

  const value: IState = {
    status,
    connectWallet: connect,
    disconnect,
    web3: ctx.library as Web3,
    wallet,
    account: ctx.account ?? '',
    chainId: ctx.chainId ?? null,
    changeChain: changeChain,
    addChain,
    canSwitchChain,
    canAddChain,
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

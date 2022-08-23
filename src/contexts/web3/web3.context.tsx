import Web3 from 'web3';
import Web3Provider, { useWeb3Context } from 'web3-react';
import React, { createContext, useCallback, useEffect, useMemo } from 'react';
import { Connector, InjectedConnector, NetworkOnlyConnector } from 'web3-react/dist/connectors';
import { useChainList } from 'hooks/use-chain-list';
import { useSearchParams } from 'react-router-dom';
import { useChainCtx } from './web3.hooks';
import { IWallet, useWalletList } from 'hooks/use-wallet-list';
import { Chain } from 'types/chain';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

const WALLET_CONNECTOR_PREFIX = 'wallet';
const formConnectorName = (name: string) => {
  return [WALLET_CONNECTOR_PREFIX, name].join(':');
}

export enum Status {
  NotConnected,
  Failed,
  Connected,
}

interface IState {
  changeChain(chain: Chain): void;
  connectWallet(wallet: IWallet): void;
  disconnect(): void;
  wallet: IWallet | null;
  chainId: number | null;
  web3: Web3;
  status: Status;
}

export const Web3Context = createContext<IState | null>(null);

export const Initial: React.FC = () => {
  const [search, setSearch] = useSearchParams();
  const ctx = useWeb3Context();

  const { chainList } = useChainList();
  
  useEffect(() => {
    const chainId = search.get('chainId');
    if (!chainId) {
      return;
    }
    const numberValue = Number(chainId);
    if (Number.isNaN(numberValue)) {
      return;
    }
    const chain = chainList.find(item => item.chainId === numberValue);
    if (!chain) {
      throw new Error('Web3Context: Chain not found by query.chainId');
    }
    ctx.setConnector(chain.rpc[0]);
  }, [])

  useEffect(() => {
    if (ctx.networkId) {
      search.set('chainId', ctx.networkId.toString());
    } else {
      search.delete('chainId');
    }
    setSearch(search);
  }, [ctx.networkId])

  return <></>;
}

export const Web3CtxProvider: React.FC<iProps> = (props) => {

  const ctx = useWeb3Context();
  const { chainList } = useChainList();
  const { wallets } = useWalletList();

  const connectWallet = useCallback((wallet: IWallet) => {
    const connectorName = formConnectorName(wallet.name)
    ctx.setConnector(connectorName, { networkId: 1});
  }, []);

  const changeChain = useCallback((chain: Chain) => {
    // TODO: choose the best rpc
    const connectorName = chain.rpc[0];
    ctx.setConnector(connectorName);
  }, [])

  const disconnect = () => {
    ctx.unsetConnector();
  }

  const wallet = useMemo(() => {
    if (!ctx.connectorName) {
      return null;
    }
    if (!ctx.connectorName.startsWith(WALLET_CONNECTOR_PREFIX)) {
      return null;
    }
    console.log(wallets, ctx.connectorName);
    
    const wallet = wallets.find((w) => {
      return formConnectorName(w.name) === ctx.connectorName;
    });
    if (!wallet) {
      throw new Error('Web3Context: Wallet not found by connectorName');
    }
    return wallet;
  }, [ctx.connectorName]);

  const status = useMemo(() => {
    if (!ctx.active && !ctx.error) {
      return Status.NotConnected;
    }
    if (ctx.error) {
      return Status.Failed;
    }
    return Status.Connected;
  }, [ctx.active, ctx.error]);

  const provider: IState = {
    changeChain,
    connectWallet,
    disconnect,
    wallet,
    chainId: ctx.networkId ?? null,
    web3: ctx.library as Web3,
    status,
  }

  return (
    <Web3Context.Provider value={provider}>
      {props.children}
    </Web3Context.Provider>
  )

}

export const ChainCtxProvider: React.FC<iProps> = (props) => {
  const { chainList } = useChainList();
  const { wallets } = useWalletList();


  const connectors = useMemo(() => {
    // TODO: any to connector
    const connectors = chainList.reduce<Record<string, any>>((map, network) => {
      for (const rpc of network.rpc) {
        const connector = new NetworkOnlyConnector({ providerURL: rpc });
        map[rpc] = connector;
      }
      return map;
    }, {});
    for (const wallet of wallets) {
      const connectorName = formConnectorName(wallet.name);
      connectors[connectorName] = wallet.connector;
    }
    return connectors;
  }, [chainList]);

  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    >
      <Initial />
      <Web3CtxProvider {...props} />
    </Web3Provider>
  )

}

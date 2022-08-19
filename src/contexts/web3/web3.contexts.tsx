import Web3 from 'web3';
import Web3Provider from 'web3-react';
import React, { useEffect, useMemo } from 'react';
import { Connector, InjectedConnector, NetworkOnlyConnector } from 'web3-react/dist/connectors';
import { useChainList } from 'hooks/use-chain-list';
import { useSearchParams } from 'react-router-dom';
import { useChainCtx } from './web3.hooks';

interface iProps {
  children: React.ReactNode | React.ReactNode[];
}

export const Initial: React.FC = () => {
  const [search, setSearch] = useSearchParams();
  const ctx = useChainCtx();

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

export const ChainCtxProvider: React.FC<iProps> = (props) => {
  const { chainList } = useChainList();

  const connectors = useMemo(() => {
    // TODO: any to connector
    const connectors = chainList.reduce<Record<string, any>>((map, network) => {
      for (const rpc of network.rpc) {
        const connector = new NetworkOnlyConnector({ providerURL: rpc });
        map[rpc] = connector;
      }
      return map;
    }, {});
    connectors.metamask = new InjectedConnector();
    return connectors;
  }, [chainList]);

  return (
    <Web3Provider
      connectors={connectors}
      libraryName={'web3.js'}
      web3Api={Web3}
    >
      <Initial />
      {props.children}
    </Web3Provider>
  )

}

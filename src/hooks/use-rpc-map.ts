import { useCallback, useEffect, useMemo, useState } from 'react';
import { DefaultAbi } from 'constants/abi'
import { AbiItem } from 'types/abi';
import { Artifact } from 'helpers/abi';
import { useLogger } from './use-logger';
import { LocalStorageWrap } from './use-local-storage';
import { Chain } from 'types/chain';
import { useChainList } from './use-chain-list';
import { useMap } from 'react-use';

const Storage = new LocalStorageWrap('chain', 'rpc');

const DefaultArtifacts = Object.keys(DefaultAbi).map((name) => new Artifact(name, () => DefaultAbi[name]));

function decodeChainId(v: string) {
  return Number(v);
}
function encodeChainId(v: number) {
  return v.toString();
}


function getOriginalStore(): Record<string, string> {
  const entries = Storage.getAllEntries<string>('.*');
  console.log("🚀 ~ file: use-rpc-map.ts:25 ~ getOriginalStore ~ entries", entries)
  if (!entries || !entries.length) {
    return {};
  }
  const result = entries.reduce((acc, [key, value]) => {
    if (Number.isNaN(decodeChainId(key))) {
      Storage.remove(key);
    }
    acc[key] = value;
    return acc;
  }, {} as Record<string, string>)
  return result;
}

const initialStore = getOriginalStore();


const ITEM = 'item';

export const useRpcMap = () => {

  const [Logger] = useLogger(useRpcMap);

  const [store, storeActions] = useMap(initialStore);

  const set = useCallback((chainId: Chain['chainId'], rpc: string) => {
    const logger = Logger.sub(set.name);
    const key = encodeChainId(chainId);
    storeActions.set(key, rpc);
    logger.debug('Rpc set', { chainId, rpc });
  }, [store]);

  const get = useCallback((chainId: Chain['chainId']): string | undefined => {
    const key = encodeChainId(chainId);
    return store[key];
  }, [store]);

  useEffect(() => {
    Logger.log('Updating..', store)
    const existing = Storage.getAllKeys(ITEM, '.*');
    Logger.debug('Keys fetched', existing);
    for (const key of existing) {
      const chainId = decodeChainId(key);
      if (Number.isNaN(chainId)) {
        Storage.remove(key);
        continue;
      }
      if (!store[chainId]) {
        Logger.log('Removing', key)
        Storage.remove(key);
      }
    }
    for (const [chainId, rpc] of Object.entries(store)) {
      const currentValue = Storage.get<string>(chainId);
      if (!currentValue) {
        Logger.log('Adding', { chainId, rpc });
        Storage.set(rpc, chainId);
      } else if (currentValue !== rpc) {
        Logger.log('Update', { chainId, newValue: rpc, currentValue });
        Storage.set(rpc, chainId);
      }
    }
    Logger.log('Updated!')
  }, [store]);

  return {
    get,
    set
  };
}

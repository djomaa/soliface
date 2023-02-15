import { useStoreCtx } from '../../ctx-hooks/use-store-ctx'
import { useStoreKey } from '../../ctx-hooks/use-store-key'
// TODO: path should be full bc of import circl dependency
import { useArtifactSaveAction } from 'hooks/use-artifact/use-artifact-save.action';
import { useLogger } from 'hooks/use-logger';
import { useCallback, useMemo } from 'react';
import { hashAbi } from 'helpers/abi/hash';
import { AbiItem } from 'types/abi';
// import { hashAbi } from 'helpers/abi/hash';
// import { AbiItem } from 'types/abi';

interface OldListItem {
  name: string;
  hash: string;
}

const hashRegExp = /(0x[\w\d]+)/;

const ListKey = useStoreKey.Pure('artifacts', 'list');
const ItemKey = (oldHash: string) => useStoreKey.Pure('artifacts', 'item', oldHash);
const AnyItemPattern = new RegExp(ItemKey(hashRegExp.source));
export const useStoreMigration1 = () => {
  const [Logger] = useLogger(useStoreMigration1.name);
  const storeCtx = useStoreCtx();
  const { saveArtifact } = useArtifactSaveAction();

  let listKey: string;
  let itemKeys: string[] = [];
  for (let i = 0; i < localStorage.length; i += 1) {
    const key = localStorage.key(i)!;
    if (!key) {
      // if LS changed duren migration
      continue;
    }
    if (key === ListKey) {
      listKey = key;
      continue;
    }
    if (AnyItemPattern.test(key)) {
      itemKeys.push(key);
      continue;
    }
  }

  const execute = useCallback(async () => {
    try {
      const rawList = localStorage.getItem(listKey);
      const list = JSON.parse(rawList!) as OldListItem[];
      for (let i = 0; i < list.length; i += 1) {
        const { name, hash } = list.splice(0, 1)[0];
        const rawAbi = localStorage.getItem(ItemKey(hash));
        const abi = JSON.parse(rawAbi!) as AbiItem[];
        const newHash = await hashAbi(abi)
        saveArtifact({
          name,
          abi,
          hash: newHash,
        })
        localStorage.removeItem(ItemKey(hash));
        localStorage.setItem(ListKey, JSON.stringify(list));
      }
    } finally {
      localStorage.removeItem(listKey);
      for (const itemKey of itemKeys) {
        localStorage.removeItem(itemKey);
      }
    }
  }, []);

  const done = useMemo(() => {
    return !listKey && !itemKeys.length;
  }, [])

  return [done, execute] as const;

}

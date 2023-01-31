import assert from 'assert';
import { useStoreKeyValue } from 'contexts/store'
import { useLogger } from 'hooks/use-logger';
import { useCallback, useMemo } from 'react';
import { Key } from './key';
import { IArtifactInfo } from './types';
import { useDefaultArtifacts } from './use-default-artifacts';


const hashRegExp = /([\w\d]+)/;
const pattern = new RegExp(Key(hashRegExp.source).name);

export const useArtifactList = () => {
  const [Logger] = useLogger(useArtifactList);

  const [oData, oSet] = useStoreKeyValue<string>(pattern);

  const defaultItems = useDefaultArtifacts();

  const storedItems = useMemo(() => {
    Logger.debug('State changed', oData);
    const result = [...oData.entries()].map<IArtifactInfo>(([key, value]) => {
      const match = key.match(pattern);
      Logger.debug('Parsing key', { key });
      assert(match, `should be matched, bc the pattern already tested in ${useStoreKeyValue.name}`);
      return {
        name: value,
        hash: match[1]
      };
    });
    Logger.debug('Parsed', result);
    return result
  }, [oData]);

  const list = useMemo(() => {
    const result: IArtifactInfo[] = [];
    for (const item of defaultItems.value ?? []) {
      const stored = storedItems.find(({ hash }) => hash === item.hash);
      if (!stored) {
        result.push(item);
      }
    }
    result.push(...storedItems);
    // const result = [
    //   ...defaultItems?.value ?? [],
    //   ...storedItems,
    // ];
    Logger.debug('Final', result);
    return result;
  }, [storedItems, defaultItems]);

  // const add = (hash: string) => {

  // }

  const remove = useCallback((hash: string) => {
    const key = Key(hash);
    oSet(key.name, undefined);
    oSet(key.abi, undefined);
  }, []);

  return { artifactList: list, removeArtifact: remove };

}

import assert from 'assert';
import { useMemo } from 'react';
import { useStoreKeyValue } from 'contexts/store'
import { useLogger } from 'hooks/use-logger';

import { Key } from './key';
import { IArtifactInfo } from './types';
import { useDefaultArtifacts } from './use-default-artifacts';


const hashRegExp = /([\w\d]+)/;
const pattern = new RegExp(Key(hashRegExp.source).name);

export const useArtifactList = () => {
  const [Logger] = useLogger(useArtifactList);

  const [oData] = useStoreKeyValue<string>(pattern);

  const defaultItems = useDefaultArtifacts();

  const storedItems = useMemo(() => {
    Logger.debug('State changed', oData);
    const result = [...oData.entries()].map<IArtifactInfo>(([key, value]) => {
      const match = key.match(pattern);
      Logger.debug('Parsing key', { key });
      assert(match, `should match, bc the pattern already tested in ${useStoreKeyValue.name}`);
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
    // for (const item of defaultItems.value ?? []) {
    //   const stored = storedItems.find(({ hash }) => hash === item.hash);
    //   if (!stored) {
    //     result.push(item);
    //   }
    // }
    result.push(...storedItems);
    // const result = [
    //   ...defaultItems?.value ?? [],
    //   ...storedItems,
    // ];
    Logger.debug('Final', result);
    return result;
  }, [storedItems, defaultItems]);

  return { artifactList: list };

}

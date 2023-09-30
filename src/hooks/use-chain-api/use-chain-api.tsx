import { useStore, useStoreKey } from 'contexts/store'
import React from 'react';
import { ScanApiSdk } from './sdk/scan.api-sdk';
import { ApiSdk } from './sdk/abstract.api-sdk';
import { useChainList } from 'hooks/use-chain-list';

interface IChainApiDetails {
  url: string;
  type: 'scan';
}

function getApi(details: IChainApiDetails) {
  switch (details.type) {
    case 'scan':
      return new ScanApiSdk(details.url);
    default:
      return '';
  }
}

export const useChainApi = (chainId: number) => {
  const key = useStoreKey(['chain', 'api', chainId]);
  const [customApiDetails] = useStore<IChainApiDetails>(key);
  const apiDetils = React.useMemo(() => {

  }, [customApiDetails]);

  const [api, setApi] = React.useState<ApiSdk>();
  const [error, setError] = React.useState<string>();

  React.useEffect(() => {
    if (!customApiDetails) {
      setError('No API details found');
      return;
    }
    const api = getApi(customApiDetails);
    if (api) {
      setApi(api);
    } else {
      setError('Unsupported API');
    }
    setError(undefined);

  }, [customApiDetails]);

  return { api, error };
}

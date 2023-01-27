import { useStoreWithDefault } from 'contexts/storage';
import { useCallback } from 'react';
import { useLogger } from './use-logger';

export interface ICookies {
  config: {
    account: boolean;
    wallet: boolean;
    chainId: boolean;
    abiHash: boolean;
  };
  accepted: boolean;
  version: string;
}

const DefaultValue: ICookies = {
  config: {
    account: true,
    wallet: true,
    chainId: true,
    abiHash: true,
  },
  accepted: false,
  version: '0.0.1',
}

export const useCookies = () => {
  const [Logger] = useLogger(useCookies.name);
  // const [oValue, oSet] = useStore<ICookies, ICookies>(['cookies'], DefaultValue);
  const [oValue, oSet, oRemove, oClone] = useStoreWithDefault(['cookies'], DefaultValue);

  const updateConfig = useCallback((v: Partial<ICookies['config']>) => {
    oSet({
      ...oValue,
      config: {
        ...oValue.config,
        ...v,
      }
    });
  }, [oValue, oSet]);

  const setDefaultConfig = useCallback(() => {
    Logger.debug('Set default config');
    // oSet((prev) => ({
    //   ...DefaultValue,
    //   ...prev,
    //   config: { ...DefaultValue.config },
    // }));
    oSet((prev) => {
      const r = {
        ...oClone(),
        ...prev,
        config: { ...DefaultValue.config },
      }
      console.log('RESULT!!!', r);
      return r;
    });
  }, [oValue, oSet]);

  const accept = useCallback(() => {
    Logger.debug('Accepted');
    oSet((prev) => ({
      ...oClone(),
      ...prev,
      accepted: true,
    }));
  }, [oValue, oSet]);

  return { value: oValue, updateConfig, setDefaultConfig, accept };
}

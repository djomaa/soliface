import { useEffect } from 'react';


import { useAnalytics } from './analytics.ctx-hooks';
import React from 'react';
import { useContractCtx } from 'contexts/contract';
import { useCookiesConfig } from 'hooks/use-cookies';

export const ChainCtxAnalytics: React.FC = () => {
  const ctx = useContractCtx();
  const cookies = useCookiesConfig();
  const analytics = useAnalytics();

  useEffect(() => {
    if (cookies.contractAddress && ctx.address) {
      analytics.track('contract_address_changed', {
        contract_address: ctx.address,
      });
    }
  }, [ctx.address, analytics]);

  useEffect(() => {
    if (cookies.abiHash && ctx.artifact) {
      analytics.track('contract_abi_changed', {
        abi_hash: ctx.artifact.hash,
      });
    }
  }, [ctx.artifact, analytics]);

  return (
    <></>
  )
}

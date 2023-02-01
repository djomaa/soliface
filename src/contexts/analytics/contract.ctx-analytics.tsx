import React, { useEffect } from 'react';


import { useAnalytics } from './analytics.ctx-hooks';
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
    if (cookies.abiHash && ctx.artifactHash) {
      // analytics.track('contract_abi_changed', {
      // abi_hash: ctx.artifactHash.hash,
      // });
    }
  }, [ctx.artifactHash, analytics]);

  return (
    <></>
  )
}

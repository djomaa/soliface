import { useEffect } from 'react';

import React from 'react';

import { useChainCtx } from 'contexts/chain';
import { useCookiesConfig } from 'hooks/use-cookies';

import { useAnalytics } from './analytics.ctx-hooks';

export const ChainCtxAnalytics: React.FC = () => {
  const ctx = useChainCtx();
  const cookies = useCookiesConfig();
  const analytics = useAnalytics();

  useEffect(() => {
    if (cookies.account && ctx.account) {
      analytics.identify(ctx.account, { wallet: ctx.wallet!.name });
    }
  }, [ctx.account, ctx.wallet, analytics]);

  useEffect(() => {
    if (cookies.wallet && ctx.wallet) {
      analytics.track('wallet_changed', {
        wallet_name: ctx.wallet.name
      });
    }
  }, [ctx.wallet, analytics]);

  useEffect(() => {
    if (cookies.chainId && ctx.chainId !== null) {
      analytics.track('chain_changed', {
        chain_id: ctx.chainId
      });
    }
  }, [ctx.chainId, analytics]);

  return (
    <></>
  )
}

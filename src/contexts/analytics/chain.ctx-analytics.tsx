import { useEffect } from 'react';

import { useChainCtx } from 'contexts/chain';

import { useAnalytics } from './analytics.ctx-hooks';
import React from 'react';

export const ChainCtxAnalytics: React.FC = () => {
  const ctx = useChainCtx();
  const analytics = useAnalytics();

  // useEffect(() => {
  //   // const account 
  //   analytics.
  // }, [ctx]);
  useEffect(() => {
    if (ctx.account) {
      analytics.identify(ctx.account, { wallet: ctx.wallet!.name });
    }
  }, [ctx.account, ctx.wallet, analytics]);

  useEffect(() => {
    if (ctx.wallet) {
      analytics.track('wallet_changed', {
        wallet_name: ctx.wallet.name
      });
    }
  }, [ctx.wallet, analytics]);

  useEffect(() => {
    if (ctx.chainId !== null) {
      analytics.track('chain_changed', {
        chain_id: ctx.chainId
      });
    }
  }, [ctx.chainId, analytics]);

  return (
    <></>
  )
}

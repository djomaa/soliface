import { useChainCtx } from 'contexts/chain';
import { useChainList } from 'hooks/use-chain-list';
import React from 'react';

interface IFetchAbiActionProps {
  address: string;
}
export const FetchAbiAction: React.FC = () => {
  const ctx = useChainCtx();
  const { chainList } = useChainList();
  const chain = React.useMemo(() => chainList.find(({ chainId }) => { chainId === ctx.chainId }), [ctx.chainId]);
  // if (chain?.explorers)

  return (
    <>
      Hello
    </>
  )
}


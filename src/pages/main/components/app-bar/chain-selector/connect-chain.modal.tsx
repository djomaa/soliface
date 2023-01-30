// import React, { useEffect, useMemo } from 'react'


// import { Chain } from 'types/chain'
// import { useDefaultRpc } from 'hooks/use-default-rpc'
// import { RpcSelectorModal } from './rpc-selector.modal';


// interface IProps {
//   chain: Chain;
// }

// export const Core = ({ chain, defaultRpc }: any) => {
//   useEffect(() => {
//     if (defaultRpc) {
//       console.log('CONNECT CHAIN!');
//     }
//   }, []);
//   return <></>
// }


// export const ConnectChainModal: React.FC<IProps> = ({ chain, ...props }) => {
//   const [defaultRpc] = useDefaultRpc(chain.chainId)

//   const node = useMemo(() => {
//     return defaultRpc ? <Core chain={chain} defaultRpc={defaultRpc} /> : <RpcSelectorModal chain={chain} open={true} onClose={props.onClose} />;
//   }, [chain])

//   return node;

// }

export { }

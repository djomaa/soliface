import { useState } from 'react';
import { ChainList } from 'constants/chain-list';

export const useChainList = () => {
  
  const [chainList, setChainList] = useState(ChainList); 

  return { chainList };
}

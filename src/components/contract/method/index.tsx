import React from 'react';
import { AbiItem } from 'types/abi';
import { MethodCtxProvider } from './context';
import { ContractMethodBody } from './contract-method';

interface iProps {
  abi: AbiItem;
}
export const ContractMethod: React.FC<iProps> = (props) => {
  return (
    <MethodCtxProvider {...props}>
      <ContractMethodBody />
    </MethodCtxProvider>
  );
}

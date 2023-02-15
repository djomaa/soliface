import React from 'react';
import { AbiItem } from 'types/abi';
import { ArtifactApiCtx, ArtifactApiCtxState } from './artifact-api.ctx-state';

export interface IArtifactCtxProps {
  address: string | undefined;
  abi: AbiItem[];
}
export const ArtifactCtxProvider: React.FC<React.PropsWithChildren<IArtifactCtxProps>> = (props) => {

  const value: ArtifactApiCtxState = {
    address: props.address,
    abi: props.abi,
  };

  return (
    <ArtifactApiCtx.Provider value={value}>
      {props.children}
    </ArtifactApiCtx.Provider>
  )

}

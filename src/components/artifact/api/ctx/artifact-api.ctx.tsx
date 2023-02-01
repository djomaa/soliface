import React from 'react';
import { AbiItem } from 'types/abi';
import { ArtifactCtx, ArtifactCtxState } from './artifact-api.ctx-state';

export interface IArtifactCtxProps {
  address: string | undefined;
  abi: AbiItem[];
}
export const ArtifactCtxProvider: React.FC<React.PropsWithChildren<IArtifactCtxProps>> = (props) => {

  const value: ArtifactCtxState = {
    address: props.address,
    abi: props.abi,
  };

  return (
    <ArtifactCtx.Provider value={value}>
      {props.children}
    </ArtifactCtx.Provider>
  )

}

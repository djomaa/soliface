import React from 'react';

import { AbiItem } from 'types/abi';

export interface ArtifactApiCtxState {
  address: string | undefined;
  abi: AbiItem[];
}

export const ArtifactApiCtx = React.createContext<ArtifactApiCtxState | null>(null);

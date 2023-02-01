import React from 'react';

import { AbiItem } from 'types/abi';

export interface ArtifactCtxState {
  address: string | undefined;
  abi: AbiItem[];
}

export const ArtifactCtx = React.createContext<ArtifactCtxState | undefined>(undefined);

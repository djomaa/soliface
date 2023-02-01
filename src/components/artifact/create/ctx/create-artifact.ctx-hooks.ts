import { createUseCtx } from 'contexts/ctx-factory';

import { CreateArtifactCtx } from './create-artifact.ctx';

export const useCreateAbiCtx = createUseCtx(CreateArtifactCtx, 'CreateArtifactCtx');

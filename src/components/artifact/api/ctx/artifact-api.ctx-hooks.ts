import { createUseCtx } from 'contexts/ctx-factory';
import { ArtifactApiCtx } from './artifact-api.ctx-state';

export const useArtifactApiCtx = createUseCtx(ArtifactApiCtx, 'ArtifactApiCtx');

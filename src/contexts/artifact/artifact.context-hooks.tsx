import { useContext } from 'react';
import { ArtifactContext } from './artifact.context';

export const useArtifactCtx = () => {
  const ctx = useContext(ArtifactContext);
  if (!ctx) {
    throw new Error('useArtifactCtx must be used within a ArtifactContextProvider');
  }
  return ctx;
}

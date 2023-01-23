import { Artifact } from 'helpers/abi'
import { useStore } from './use-store'

export const useArtifact = (hash: string) => {
  const [value, set, remove] = useStore<Artifact>(['artifact', hash]);


}

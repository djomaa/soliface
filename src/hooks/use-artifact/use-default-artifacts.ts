import { DefaultAbi } from 'constants/abi'
import { useAsync } from 'react-use'
import { AbiItem } from 'types/abi'
import { sha256 } from 'utils/hash'
import { IArtifact } from './types'

async function createArtifact(name: string, abi: AbiItem[]): Promise<IArtifact> {
  const strAbi = JSON.stringify(abi);
  const hash = await sha256(strAbi);
  const artifact: IArtifact = {
    name,
    hash,
    isDefault: true,
  };
  return artifact;
}

export const useDefaultArtifacts = () => {
  const state = useAsync(async () => {
    const entries = Object.entries(DefaultAbi);
    const result = await Promise.all(entries.map(([name, abi]) => {
      return createArtifact(name, abi);
    }));
    return result;
  }, [])

  return state;
}

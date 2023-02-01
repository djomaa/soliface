import { useStore } from 'contexts/store'
import { hashAbi } from 'helpers/abi/hash';
import { generateAbiSignatureHash } from 'helpers/abi/signature-hash';
import { safeObj } from 'helpers/safe';
import { useMemo } from 'react';
import { useAsync } from 'react-use';
import { AbiItem } from 'types/abi';
import { Key } from './key'

export const useArtifact = (hash: string) => {
  const key = useMemo(() => Key(hash), [hash]);

  const [name, setName] = useStore<string>(key.name);
  const [rawAbi, setRawAbi] = useStore<string>(key.abi);

  const isExist = useMemo(() => {
    return name !== undefined && rawAbi !== undefined;
  }, [name, rawAbi]);

  const abi = useMemo(() => {
    if (!isExist) {
      return;
    }
    return JSON.parse(rawAbi!) as AbiItem[];
  }, [rawAbi]);

  const signatureHash = useMemo(() => {
    if (!isExist) {
      return;
    }
    return safeObj(() => generateAbiSignatureHash(abi!));
  }, [abi])

  const actualHash = useAsync(async () => {
    if (!isExist) {
      return;
    }
    // TODO: deep compare before hash
    return hashAbi(abi!);
  }, [abi]);

  const corruptionReason = useMemo(() => {
    if (!isExist || actualHash.loading) {
      return;
    }
    if (signatureHash!.error) {
      return 'cannot generate signature hash';
    }
    if (actualHash.error) {
      return 'failed to generate hash';
    }
    if (actualHash.value !== hash) {
      return 'actual hash is different'
    }
  }, [isExist, signatureHash, actualHash]);

  const result = useMemo(() => {
    if (!isExist) {
      return {
        loading: false,
        name: undefined,
        abi: undefined,
        rawAbi: undefined,
        isExist: false,
        isCorrupted: undefined,
        corruptionReason: undefined,
      } as NotExists;
    };
    if (isExist && actualHash.loading) {
      return {
        loading: true,
        name: undefined,
        abi: undefined,
        rawAbi: undefined,
        isExist: true,
        isCorrupted: undefined,
        corruptionReason: undefined,
      } as ExistsLoading;
    }
    if (isExist && !actualHash.loading && corruptionReason) {
      return {
        loading: false,
        name,
        abi: undefined,
        rawAbi,
        isExist: true,
        isCorrupted: true,
        corruptionReason,
      } as ExistsLoadedCorrupted;
    }
    return {
      loading: false,
      name,
      abi: abi!,
      rawAbi,
      isExist: true,
      isCorrupted: false,
      corruptionReason,
    } as ExistsLoadedNotCorrupted;
  }, [name, abi, rawAbi, actualHash.loading, corruptionReason]);

  return result;
}


export type ExistsLoaded = ExistsLoadedCorrupted | ExistsLoadedNotCorrupted
export type Exists = ExistsLoading | ExistsLoaded;
export type UseArtifactReturn = NotExists | Exists;


export interface NotExists {
  loading: false,
  name: undefined,
  abi: undefined,
  rawAbi: undefined,
  isExist: false,
  isCorrupted: undefined,
  corruptionReason: undefined,
}

export interface ExistsLoading {
  loading: true,
  name: undefined,
  abi: undefined,
  rawAbi: undefined,
  isExist: true,
  isCorrupted: undefined,
  corruptionReason: undefined,
}

export interface ExistsLoadedCorrupted {
  loading: false,
  name: string,
  abi: undefined,
  rawAbi: string,
  isExist: true,
  isCorrupted: true,
  corruptionReason: string,
}

export interface ExistsLoadedNotCorrupted {
  loading: false,
  name: string,
  abi: AbiItem[],
  rawAbi: string,
  isExist: true,
  isCorrupted: false,
  corruptionReason: undefined,
}

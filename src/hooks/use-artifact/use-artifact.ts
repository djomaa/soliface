import { useStoreV1 } from 'contexts/store'
import { hashAbi } from 'helpers/abi/hash';
import { generateAbiSignatureHash } from 'helpers/abi/signature-hash';
import { safe, safeAsync } from 'helpers/safe';
import { useLogger } from 'hooks/use-logger';
import React from 'react';
import { useEffect, useMemo, useState } from 'react';
import { AbiItem } from 'types/abi';
import { useAsyncEffect } from 'use-async-effect';
import { Key } from './key'

export const useArtifact = (hash: string) => {
  const [Logger] = useLogger(useArtifact, hash);
  const hashRef = React.useRef<string | undefined>(hash);

  const key = useMemo(() => Key(hash), [hash]);

  const nameStore = useStoreV1.Object<string>(key.name);
  const rawAbiStore = useStoreV1.Object<string>(key.abi);

  const [abi, setAbi] = useState<AbiItem[]>();
  const [error, setError] = useState<Error>();
  const [loading, setLoading] = useState(true);
  const [state, setState] = useState<UseArtifactReturn>({ loading: true })

  useEffect(() => {
    hashRef.current = hash;
    return () => {
      hashRef.current = undefined;
    }
  }, [hash]);

  useEffect(() => {
    const logger = Logger.sub('effect(rawAbi)');
    setLoading(true);
    if (nameStore.loading || rawAbiStore.loading) {
      logger.debug('Loading');
      return;
    }
    logger.debug('Checking', { nameStore, rawAbiStore })
    if (!nameStore.value || !rawAbiStore.value) {
      logger.debug('Not exists');
      setLoading(false);
      setAbi(undefined);
      return;
    }
    const [abiError, abi] = safe(() => JSON.parse(rawAbiStore.value!) as AbiItem[]);
    if (abiError) {
      logger.warn('Abi decode failed', abiError);
      setLoading(false);
      setError(abiError);
      return;
    }
    const [signatureHashError] = safe(() => generateAbiSignatureHash(abi!));
    if (signatureHashError) {
      logger.warn('Signature hashing failed', abiError);
      setLoading(false);
      setError(signatureHashError);
      return;
    }
    // TODO:! deep compare
    setAbi(abi);
    logger.debug('Checked, abi regenerated');
  }, [rawAbiStore]);

  useAsyncEffect(async (isMounted) => {
    const logger = Logger.sub('asyncEffect(abi)');
    if (!abi) {
      logger.debug('Empty');
      return;
    }
    logger.debug('Checking', abi)
    const [actualHashError, actualHash] = await safeAsync(() => hashAbi(abi!));
    if (!isMounted()) {
      logger.debug('Not mounted');
      return;
    }
    if (hashRef.current !== hash) {
      logger.debug('Hash changed');
      return;
    }
    if (actualHashError) {
      logger.warn('Actual hashing failed', actualHashError);
      setError(actualHashError);
      return;
    }
    if (actualHash !== hash) {
      logger.warn('Hash mismatch', actualHash, hash);
      setError(new Error('Hash mismatch'));
      return;
    }
    setLoading(false);
    logger.debug('Checked, hash matched')
  }, [abi]);

  useEffect(() => {
    const generateState = () => {
      if (loading) {
        return {
          loading: true,
        } as Loading;
      }

      if (!nameStore.value || !rawAbiStore.value) {
        return {
          loading: false,
          isExist: false,
        } as LoadedNotExists;
      };

      if (error) {
        return {
          loading: false,
          isExist: true,
          name: nameStore.value,
          rawAbi: rawAbiStore.value,
          abi: abi,
          error: error,
        } as LoadedExistsCorrupted
      }

      return {
        loading: false,
        isExist: true,
        isCorrupted: false,
        name: nameStore.value,
        rawAbi: rawAbiStore.value,
        abi,
      } as LoadedExistsNotCorrupted;
    }
    const newValue = generateState();
    setState(newValue);
    Logger.debug('State updated', newValue)
  }, [loading, nameStore, rawAbiStore, error, abi]);

  return state;
}



export type LoadedExists = LoadedExistsCorrupted | LoadedExistsNotCorrupted
export type UseArtifactReturn = Loading | LoadedNotExists | LoadedExists;

export interface Loading {
  loading: true,
  name?: undefined,
  abi?: undefined,
  rawAbi?: undefined,
  isExist?: undefined,
  error?: undefined,
}

export interface LoadedNotExists {
  loading: false,
  isExist: false,
  name?: undefined,
  abi?: undefined,
  rawAbi?: undefined,
  error?: undefined,
}

export interface LoadedExistsCorrupted {
  loading: false,
  isExist: true,
  error: Error,
  name: string,
  abi: undefined,
  rawAbi: string,
}

export interface LoadedExistsNotCorrupted {
  loading: false,
  name: string,
  abi: AbiItem[],
  rawAbi: string,
  isExist: true,
  error?: undefined,
}

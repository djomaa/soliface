/*
import { IArtifact } from 'constants/abi';
import { useState, useEffect } from 'react';
import { Logger } from './use-logger';
import { MyStorage, useStorage } from './use-storage';

type IArtifactShort = Omit<IArtifact, 'hash'>;

const logger = new Logger('use-artifact-store');

const isArtifact = (item: unknown): item is IArtifactShort  => {
  if (!item) {
    return false;
  }
  if (typeof item !== 'object') {
    return false; 
  }
  if (!('name' in item)) {
    MyStorage.remove(item);
    return false;
  }
  if (!('abi' in item)) {
    return false;
  }
  return true;
}

const list = MyStorage.getAllKeys('artifacts');
for (const item of list) {
  if (!item) {
    MyStorage.remove(item);
    return;
  }
  if (typeof item !== 'object') {
    MyStorage.remove(item);
    return;
  }
  if (!('name' in item)) {
    MyStorage.remove(item);
    return;
  }
  if (!('abi' in item)) {
    MyStorage.remove(item);
    return;
  }
  item
}

export const useArtifactStore = () => {
  const [artifacts, setArtifacts] = useState<Artifact[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const artifacts = useState()

  useEffect(() => {
    if (storage?.artifacts && Array.isArray())
  }, [storage])

  const loadArtifacts = async () => {
    setLoading(true);
    setError(null);

    try {
      const artifacts = await loadArtifactsFromDisk();
      setArtifacts(artifacts);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadArtifacts();
  }, []);

  return {
    artifacts,
    loading,
    error,
    loadArtifacts,
  };
}
*/
export {}

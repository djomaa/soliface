// import assert from 'assert';
// import { useStore } from 'contexts/store'
// import { hashAbi } from 'helpers/abi/hash';
// import { generateAbiSignatureHash } from 'helpers/abi/signature-hash';
// import { safeObj } from 'helpers/safe';
// import { useLogger } from 'hooks/use-logger';
// import { useEffect, useMemo } from 'react';
// import { useAsync, usePrevious } from 'react-use';
// import { AbiItem } from 'types/abi';
// import { Key } from './key'

// export const useArtifact = (hash: string) => {
//   const [Logger] = useLogger(useArtifact, hash);

//   const key = useMemo(() => Key(hash), [hash]);

//   const [name, setName] = useStore<string>(key.name);
//   const [rawAbi, setRawAbi] = useStore<string>(key.abi);
//   Logger.debug('Use state', hash, key, { name, rawAbi });

//   const isExist = useMemo(() => {
//     return name !== undefined && rawAbi !== undefined;
//   }, [name, rawAbi]);

//   const abi = useMemo(() => {
//     const logger = Logger.sub('abi');
//     if (!isExist) {
//       logger.debug('Empty, not exists');
//       return;
//     }
//     logger.debug('Parsing');
//     return JSON.parse(rawAbi!) as AbiItem[];
//   }, [rawAbi]);

//   const signatureHash = useMemo(() => {
//     const logger = Logger.sub('signatureHash');
//     if (!isExist) {
//       logger.debug('Empty, not exists');
//       return;
//     }
//     logger.debug('Generating');
//     return safeObj(() => generateAbiSignatureHash(abi!));
//   }, [abi])

//   useEffect(() => {
//     Logger.debug('ABI CHANGED');
//   }, [abi])

//   const pAbi = usePrevious(abi);
//   let eq;
//   try {
//     assert.deepEqual(pAbi, abi);
//     eq = true;
//   } catch (e) {
//     eq = false;
//   }
//   Logger.debug('Equal', eq, pAbi === abi, pAbi, abi)


//   const actualHash = useAsync(() => {
//     const logger = Logger.sub('actualHash');



//     if (!isExist) {
//       logger.debug('Empty, not exists');
//       return Promise.resolve();
//     }
//     // TODO: deep compare before hash
//     logger.debug('Hashing');
//     return hashAbi(abi!);
//   }, [abi]);

//   const corruptionReason = useMemo(() => {
//     const logger = Logger.sub('corruption');
//     logger.debug('Checking..', { isExist, signatureHash, actualHash, hash })
//     if (!isExist || actualHash.loading) {
//       return;
//     }
//     if (signatureHash!.error) {
//       return 'cannot generate signature hash';
//     }
//     if (actualHash.error) {
//       return 'failed to generate hash';
//     }
//     if (actualHash.value !== hash) {
//       logger.warn('actual hash is different', { actual: actualHash.value, stored: hash })
//       return 'actual hash is different'
//     }
//   }, [isExist, signatureHash, actualHash, hash]);

//   const result = useMemo(() => {
//     if (!isExist) {
//       return {
//         loading: false,
//         name: undefined,
//         abi: undefined,
//         rawAbi: undefined,
//         isExist: false,
//         isCorrupted: undefined,
//         corruptionReason: undefined,
//       } as NotExists;
//     };
//     if (isExist && actualHash.loading) {
//       return {
//         loading: true,
//         name: undefined,
//         abi: undefined,
//         rawAbi: undefined,
//         isExist: true,
//         isCorrupted: undefined,
//         corruptionReason: undefined,
//       } as ExistsLoading;
//     }
//     if (isExist && !actualHash.loading && corruptionReason) {
//       return {
//         loading: false,
//         name,
//         abi: undefined,
//         rawAbi,
//         isExist: true,
//         isCorrupted: true,
//         corruptionReason,
//       } as ExistsLoadedCorrupted;
//     }
//     return {
//       loading: false,
//       name,
//       abi: abi!,
//       rawAbi,
//       isExist: true,
//       isCorrupted: false,
//       corruptionReason,
//     } as ExistsLoadedNotCorrupted;
//   }, [name, abi, rawAbi, actualHash.loading, corruptionReason]);

//   return result;
// }

// useArtifact.orEmpty = (hash: string | undefined) => {



// }


// export type ExistsLoaded = ExistsLoadedCorrupted | ExistsLoadedNotCorrupted
// export type Exists = ExistsLoading | ExistsLoaded;
// export type UseArtifactReturn = NotExists | Exists;


// export interface NotExists {
//   loading: false,
//   name: undefined,
//   abi: undefined,
//   rawAbi: undefined,
//   isExist: false,
//   isCorrupted: undefined,
//   corruptionReason: undefined,
// }

// export interface ExistsLoading {
//   loading: true,
//   name: undefined,
//   abi: undefined,
//   rawAbi: undefined,
//   isExist: true,
//   isCorrupted: undefined,
//   corruptionReason: undefined,
// }

// export interface ExistsLoadedCorrupted {
//   loading: false,
//   name: string,
//   abi: undefined,
//   rawAbi: string,
//   isExist: true,
//   isCorrupted: true,
//   corruptionReason: string,
// }

// export interface ExistsLoadedNotCorrupted {
//   loading: false,
//   name: string,
//   abi: AbiItem[],
//   rawAbi: string,
//   isExist: true,
//   isCorrupted: false,
//   corruptionReason: undefined,
// }

export { }

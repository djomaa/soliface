// import { useStore } from '../../ctx-hooks/use-store-v1'
// import { useStoreCtx } from '../../ctx-hooks/use-store-ctx'
// import { useStoreKey } from '../../ctx-hooks/use-store-key'
// import { generateAbiSignatureHash } from 'helpers/abi/signature-hash';
// import { safe } from 'helpers/safe';
// // TODO: path should be full bc of import circl dependency
// import { useArtifactSaveAction } from 'hooks/use-artifact/use-artifact-save.action';
// import { useLogger } from 'hooks/use-logger';
// import { modal } from 'libs/modals';
// import { useCallback, useMemo } from 'react';
// import { AbiItem } from 'types/abi';
// import { StoreMigration1Modal } from './1-store-migration.modal.modal';
// import { hashAbi } from 'helpers/abi/hash';

// interface OldListItem {
//   name: string;
//   hash: string;
// }

// const hashRegExp = /(0x[\w\d]+)/;

// const AbiKey = (oldHash: string) => useStoreKey.Pure('artifacts', 'item', oldHash);
// export const useStoreMigration1 = () => {
//   const [Logger] = useLogger(useStoreMigration1.name);
//   const storeCtx = useStoreCtx();
//   const listKey = useStoreKey(['artifacts', 'list']);
//   const [list] = useStore<OldListItem[]>(listKey);
//   const { saveArtifact } = useArtifactSaveAction();

//   const execute = useCallback(async () => {
//     if (!list) {
//       return;
//     }
//     Logger.debug('Old list', list)
//     for (let i = 0; i < list.length; i += 1) {
//       const { name, hash: oldHash } = list[i];
//       // for (const { name, hash: oldHash } of list) {
//       const abiKey = AbiKey(oldHash);
//       const [oAbiError, oAbi] = safe(() => storeCtx.getState(abiKey));
//       const [sHashError] = safe(() => generateAbiSignatureHash(oAbi as AbiItem[]));
//       Logger.debug({ name, oldHash, abiError: oAbiError, sHashError, abi: oAbi })
//       if (oAbiError || sHashError) {
//         const rawAbi = localStorage.getItem(abiKey);
//         await modal.promise(StoreMigration1Modal, { name, rawAbi: rawAbi ?? undefined, error: (oAbiError ?? sHashError)! });
//         continue;
//       }
//       // if sHash generated succesfully, abi is valid, but it should be done in another way, BUT (:D) its migration, so ok
//       const abi = oAbi as AbiItem[];
//       const hash = await hashAbi(abi)
//       saveArtifact({
//         name,
//         abi,
//         hash,
//       })
//       console.log("🚀 ~ file: 1.store-migration.tsx:52 ~ execute ~ abiKey", abiKey)
//       storeCtx.set(abiKey, undefined);
//       list.splice(i, 1);
//       storeCtx.set(listKey, list);
//     }
//     storeCtx.set(listKey, undefined);

//     const anyAbiKey = new RegExp(AbiKey(hashRegExp.source));
//     console.log("🚀 ~ file: 1.store-migration.tsx:63 ~ execute ~ anyAbiKey", anyAbiKey)
//     for (let i = 0; i < localStorage.length; i += 1) {
//       const key = localStorage.key(i)!;
//       if (anyAbiKey.test(key)) {
//         localStorage.removeItem(key);
//       }
//     }
//   }, []);

//   const done = useMemo(() => {
//     return !list || !list.length;
//   }, [list])

//   return [done, execute] as const;

// }

export { }

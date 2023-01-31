// import { useStoreCtx, useStoreKey } from 'contexts/store'

// const ArtifactKey = 'artifact';
// const Key = (hash: string) => {
//   const generateKey = (property: string) => useStoreKey.Pure('artifact', hash, property);
//   return {
//     name: generateKey('name'),
//     abi: generateKey('abi'),
//   }
// }

// export const useArtifactFactory = (hash: string) => {
//   const store = useStoreCtx();


//   const ArtifactCtor = useMemo(() => {

//     class Artifact {
//       private Key = Key(this.hash);

//       _name?: string;
//       get name() {

//       }

//       _abi?: string
//       get abi() {

//       }

//       _signatureHash?: string;
//       get signatureHash() {

//       }

//       constructor(readonly hash: string) {
//       }

//       subscribe() {
//         store.addListener(this.Key.name, (value) => )
//       }



//     }
//   }, [hash])

// }

// export class Artifact {

//   constructor(hash: string) {

//   }

// }

export { }

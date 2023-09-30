import { RxCollection, RxDatabase, RxDatabaseGenerated } from 'rxdb';
import { Chain } from './schema/chain';
import { RxDatabaseBaseExtended } from 'rxdb-hooks';

export const DbCollectionCreatorMap = {
  [Chain.Collection.Name]: Chain.Collection.Creator,
}
export type DbCollections = {
  [Chain.Collection.Name]: Chain.Collection.Type;
}
export type DbCollection<T extends keyof DbCollections> = DbCollections[T];
export type DbCollectionDocType<T extends keyof DbCollections> = DbCollections[T] extends RxCollection<infer T> ? T : never;

export type Db = RxDatabaseBaseExtended<DbCollections> & DbCollections & RxDatabaseGenerated<DbCollections>;

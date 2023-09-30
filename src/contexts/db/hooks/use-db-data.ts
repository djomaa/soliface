import { QueryConstructor, RxQueryResultDoc, RxQueryResultJSON, UseRxQueryOptions, useRxData, useRxQuery } from 'rxdb-hooks'
import { DbCollection, DbCollections } from '../db.ctx-state';
import { Override } from 'rxdb-hooks/dist/type.helpers';


export function useDbData<T>(collectionName: string, queryConstructor: QueryConstructor<T> | undefined): RxQueryResultDoc<T>;
export function useDbData<T>(
  collectionName: string,
  queryConstructor: QueryConstructor<T> | undefined,
  options?: Override<UseRxQueryOptions, {
    json?: false;
  }>
): RxQueryResultDoc<T>;
export function useDbData<T>(
  collectionName: string,
  queryConstructor: QueryConstructor<T> | undefined,
  options?: Override<UseRxQueryOptions, {
    json: true;
  }>
): RxQueryResultJSON<T>;
export function useDbData<
  TKey extends keyof DbCollections,
  T extends DbCollection<TKey> = DbCollection<TKey>
>(
  name: TKey,
  query: QueryConstructor<T> | undefined,
  options?: UseRxQueryOptions
) {
  const db = useRxQuery();

  return useRxData(name, query, options as any);
}


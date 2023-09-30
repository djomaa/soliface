import { useRxCollection, useRxDB } from 'rxdb-hooks';
import { DbCollection, DbCollections } from '../db.ctx-state';
import assert from 'assert';
import { RxCollection } from 'rxdb';
import React from 'react';
import { useDb } from './use-db';

// export const useDbCollection = <T extends keyof DbCollections>(key: T) => {
// const collection = useRxCollection<DbCollection<T>>(key);
//   // assert(!!collection, 'Collection was not loaded');
//   return collection;
// }

export function useDbCollection<T extends keyof DbCollections>(name: T): DbCollection<T> {
  const db = useDb();
  const [collection, setCollection] = React.useState<DbCollection<T>>(db.collections[name] as DbCollection<T>);

  React.useEffect(() => {
    if (db.newCollections$) {
      const sub = db.newCollections$.subscribe(col => {
        if (col[name]) {
          // We don't unsubscribe so that we get notified
          // and update collection if it gets deleted/recreated
          setCollection(col[name] as DbCollection<T>);
        }
      });
      return () => {
        sub.unsubscribe();
      };
    }
  }, [db, name]);

  return collection;
}


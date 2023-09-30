import { RxDatabase, addRxPlugin, createRxDatabase } from 'rxdb';
import { getRxStorageDexie } from 'rxdb/plugins/storage-dexie';
import { Chain, } from './schema/chain';
import { ChainSchema } from './schema/chain/chain.schema';
import React from 'react';
import { useAsyncState } from 'hooks/use-async-state';
import useAsyncEffect from 'use-async-effect';
import { Provider } from 'rxdb-hooks';
import { Db, DbCollectionCreatorMap, DbCollections } from './db.ctx-state';
import CircularProgress from '@mui/material/CircularProgress';
import { useAsync } from 'hooks/use-async';
import { RxDBDevModePlugin } from 'rxdb/plugins/dev-mode';
import { RxDBQueryBuilderPlugin } from 'rxdb/plugins/query-builder';
addRxPlugin(RxDBDevModePlugin);
addRxPlugin(RxDBQueryBuilderPlugin);


export const DbProvider: React.FC<React.PropsWithChildren> = (props) => {
  const state = useAsync(async ({ onDestroy }) => {
    const db = await createRxDatabase<DbCollections>({
      name: 'mydb',
      storage: getRxStorageDexie(),
      allowSlowCount: true,
      ignoreDuplicate: true, // TODO: remove in production
    });
    // TODO: remove in production
    // @ts-ignore
    window.db = db;
    await db.addCollections(DbCollectionCreatorMap);
    onDestroy(() => db.destroy())
    return db;
  }, [])

  if (state.loading) {
    return <CircularProgress />
  }

  if (state.error) {
    return <>{state.error.message}</>
  }

  return (
    <Provider db={state.value}>
      {props.children}
    </Provider>
  )
}

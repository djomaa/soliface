import assert from 'assert';
import React from 'react';
import { Context } from 'rxdb-hooks';
import { Db } from '../db.ctx-state';

export const useDb = () => {
  const ctx = React.useContext(Context);
  assert(ctx, 'Db context does not exist');
  assert(ctx.db, 'Db was not loaded');
  return ctx.db as Db;
}

import Box from '@mui/material/Box';
import { DataGrid } from '@mui/x-data-grid/DataGrid';
import { useDbCollection } from 'contexts/db/hooks/use-db-collection'
import { useDbQuery } from 'contexts/db/hooks/use-db-query';
import { Chain } from 'contexts/db/schema/chain'
import React from 'react';
import { useChainListColumns } from './chain-list.columns';
import { useRxQuery } from 'rxdb-hooks';
import { useDbData } from 'contexts/db/hooks/use-db-data';
import { useAsync } from 'hooks/use-async';
import { ChainListToolbar } from './chain-list.toolbar';
import { GridFilterModel } from '@mui/x-data-grid/models';
import { MangoQuerySelector, RxQuery } from 'rxdb';

const createQuerySelector = (search: string) => {
  if (!search) {
    return;
  }
  const selector: MangoQuerySelector<Chain.DocType> = {
    $or: [
      {
        name: { $regex: new RegExp(search) },
      },
    ]
  };

  const n = Number(search);
  if (!isNaN(n)) {
    selector!.$or!.push({
      chainId: n,
    })
  }
  return selector;
}

export const ChainList: React.FC = () => {
  const [page, setPage] = React.useState(0);
  const [pageSize, setPageSize] = React.useState(100);
  const [search, setSearch] = React.useState<MangoQuerySelector<Chain.DocType>>()

  const chainCollection = useDbCollection(Chain.Collection.Name);
  const columns = useChainListColumns();

  const count = useAsync(() => {

    return chainCollection.count({ selector: search }).exec();
  }, [chainCollection, search]);

  const stream = useAsync(() => {
    const skip = page * pageSize;
    return chainCollection.find({
      selector: search,
      skip,
      limit: pageSize,
    }).exec();
  }, [chainCollection, search]);
  // const qb = React.useCallback((collection: Chain.Collection.Type) => {
  //   console.log('UPDATE', search);
  //   return collection.find({ selector: search });
  // }, [search]);


  // const stream = useDbData(Chain.Collection.Name, qb, {
  //   pageSize,
  //   pagination: 'Traditional',
  //   json: true,
  // });
  // console.log("🚀 ~ file: chain.list.tsx:58 ~ stream:", stream, qb)
  // const qb = React.useMemo(() => {
  //   return chainCollection.find({ selector: search })
  // }, [chainCollection, search])

  // const stream = useDbQuery(qb, {
  //   pageSize,
  //   pagination: 'Traditional',
  //   json: true,
  // });

  return (
    <Box sx={{ height: '60vh', width: '1' }}>
      <DataGrid
        // autoHeight
        // sx={{ height: '100%' }}
        loading={stream.loading || count.loading}
        page={page}
        onPageChange={(page) => setPage(page)}
        onPageSizeChange={setPageSize}
        pageSize={pageSize}
        rows={stream.value ?? []}
        rowCount={count.value ?? 0}
        initialState={{
          sorting: {
            sortModel: [{ field: 'chainId', sort: 'asc' }]
          },
        }}
        filterMode="server"
        onFilterModelChange={(filterModel) => {
          const value = filterModel.quickFilterValues?.join('');
          const selector = value ? createQuerySelector(value) : undefined;
          setSearch(selector);
        }}
        components={{ Toolbar: ChainListToolbar }}
        columns={columns}
        paginationMode='server'
        density='compact'
      />
    </Box>
  )

}

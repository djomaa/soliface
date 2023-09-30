import { RxDocument, RxCollection, RxCollectionCreator } from 'rxdb';

import { ChainSchema, ChainDocType } from './chain.schema';

export namespace Chain {
  export type DocType = ChainDocType;
  export type Doc = RxDocument<ChainDocType>;
  export namespace Collection {
    export const Name = 'chain';
    export type Type = RxCollection<ChainDocType>;
    export const Creator: RxCollectionCreator<ChainDocType> = {
      schema: ChainSchema,
    }
  }

}

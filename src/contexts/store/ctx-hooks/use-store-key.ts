import { useKey } from 'hooks/use-key';
import { StringifyAble } from 'types/common';
import { DELEMITER } from 'constants/storage';

export const useStoreKey = (params: StringifyAble[]) => {
  return useKey(DELEMITER, ...params);
}

// TODO: rename to createStoreKey
useStoreKey.Pure = useKey.Pure.bind(undefined, DELEMITER);

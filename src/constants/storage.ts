// import { AppName } from './common'

import { StringifyAble } from 'types/common';

// export const APP_NAME = AppName;
export const APP_NAME = 'soliface';

export const DELEMITER = '/'

export function createKey(...keys: StringifyAble[]) {
  return keys.join(DELEMITER)
}

createKey.DELEMITER = DELEMITER

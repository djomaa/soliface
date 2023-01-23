import { AppName } from './common'

export const APP_NAME = AppName;

const DELEMITER = '/'

export function createKey(...keys: Array<string | number>) {
  return keys.join(DELEMITER)
}

createKey.DELEMITER = DELEMITER

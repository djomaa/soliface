export const APP_NAME = 'soliface'

const DELEMITER = '/'

export function createKey (...keys: Array<string | number>) {
  return keys.join(DELEMITER)
}

createKey.DELEMITER = DELEMITER

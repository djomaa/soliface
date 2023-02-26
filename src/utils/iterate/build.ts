import { Logger } from 'helpers/logger';

let id = 0;
export function buildObject<T>(obj: T, path: (number | string)[], value: any) {
  const logger = new Logger('buildObject', id++);
  logger.debug('Started', { obj, path, value });
  const root = path.reduce((acc, oKey, i) => {
    const key = oKey as keyof T;
    if (i === path.length - 1) {
      acc[key] = value;
      return acc;
    }
    if (!acc[key]) {
      acc[key] = {} as any;
    }
    return acc[key] as any;
  }, obj);
  logger.debug('Done', root)
  return root;
}

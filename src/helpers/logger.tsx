import { AppName } from 'constants/common';
import { StringifyAble } from 'types/common'

export class Logger {
  public prefix: string;
  constructor(...parts: StringifyAble[]) {
    this.prefix = Logger.Keys(parts);
  }

  log(...args: any[]) {
    console.log(`[${this.prefix}]`, ...args)
  }

  error(...args: any[]) {
    console.error(`[${this.prefix}]`, ...args)
  }

  debug(...args: any[]) {
    console.debug(`[${this.prefix}]`, ...args)
  }

  warn(...args: any[]) {
    console.warn(`[${this.prefix}]`, ...args)
  }

  sub(...parts: StringifyAble[]) {
    const prefix = Logger.Keys([this.prefix, ...parts]);
    return new Logger(prefix)
  }

  static Keys(parts: StringifyAble[]) {
    parts = parts[0].toString().startsWith(AppName) ? parts : [AppName, ...parts];
    return parts.join(':');
  }
}

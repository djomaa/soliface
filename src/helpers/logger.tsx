export class Logger {
  constructor(public prefix: string) {
  }

  log(...args: any[]) {
    console.log(`[${this.prefix}]`, ...args);
  }

  error(...args: any[]) {
    console.error(`[${this.prefix}]`, ...args);
  }

  debug(...args: any[]) {
    console.debug(`[${this.prefix}]`, ...args);
  }

  warn(...args: any[]) {
    console.warn(`[${this.prefix}]`, ...args);
  }

  sub(...parts: string[]) {
    const prefix = [this.prefix, ...parts].join(':');
    return new Logger(prefix);
  }

}

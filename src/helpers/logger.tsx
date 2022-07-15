export class Logger {
  constructor(public prefix: string) {
  }

  log(...args: any[]) {
    console.log(`[${this.prefix}]`, ...args);
  }

  sub(prefix: string) {
    return new Logger(`${this.prefix}:${prefix}`);
  }

}

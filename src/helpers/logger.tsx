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


  sub(prefix: string) {
    return new Logger(`${this.prefix}:${prefix}`);
  }

}

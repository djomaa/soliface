import { AbiItem } from 'types/abi';

export abstract class ApiSdk {
  abstract readonly type: string;

  constructor(readonly url: string) {

  }

  abstract getContractAbi(address: string): Promise<AbiItem[]>;
}

export class ApiSdkError extends Error {

}

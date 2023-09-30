import { ApiSdk, ApiSdkError } from './abstract.api-sdk';


export class ScanApiSdk extends ApiSdk {
  type = 'default';

  async getContractAbi(address: string) {
    try {
      const url = `${this.url}/api?module=contract&action=getabi&address=${address}`;
      const response = await fetch(url);
      const obj = await response.json();
      return obj.result;
    } catch (error) {
      throw new ApiSdkError('Faield to fetch abi', { cause: error });
    }
  }

}

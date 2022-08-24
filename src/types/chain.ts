export interface IExplorer {
  name: string;
  url: string;
  standard: string;
}

export interface Chain {
  name: string;
  chainId: number;
  rpc: string[];
  shortName: string;
  explorers?: IExplorer[];
}

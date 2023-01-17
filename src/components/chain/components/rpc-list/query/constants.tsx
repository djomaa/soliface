export interface IData {
  latency: number;
  block: number;
}
export const RPC_TIMEOUT = 5e3;
export const RPC_REFETCH_INTERVAL = 60_000;

export const RPC_CALL_GET_BLOCK_NUMBER = JSON.stringify({
  jsonrpc: "2.0",
  method: "eth_blockNumber",
  params: [],
  id: 1,
});

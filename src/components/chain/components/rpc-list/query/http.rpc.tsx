import axios from "axios";
import { QueryOptions } from 'react-query';
import axiosTime, { TimeAxiosResponse } from 'axios-time';

import { IData, RPC_REFETCH_INTERVAL, RPC_CALL_GET_BLOCK_NUMBER, RPC_TIMEOUT } from './constants';

const axiosInstance = axios.create({
  timeout: RPC_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});
axiosTime(axiosInstance);

export async function fetchHttpRpcData(url: string) {
  const res = await axiosInstance.post<any, TimeAxiosResponse>(url, RPC_CALL_GET_BLOCK_NUMBER);
  console.log("🚀 ~ file: http.rpc.tsx:16 ~ fetchHttpRpcData ~ res", res)
  return {
    latency: res.timings.elapsedTime,
    block: Number(res.data.result),
  };
};


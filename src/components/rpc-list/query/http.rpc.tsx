import axios from 'axios'
import axiosTime, { TimeAxiosResponse } from 'axios-time'

import { RPC_CALL_GET_BLOCK_NUMBER, RPC_TIMEOUT } from './constants'

const axiosInstance = axios.create({
  timeout: RPC_TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})
axiosTime(axiosInstance)

export async function fetchHttpRpcData (url: string) {
  const res = await axiosInstance.post<any, TimeAxiosResponse>(url, RPC_CALL_GET_BLOCK_NUMBER)
  return {
    latency: res.timings.elapsedTime,
    block: Number(res.data.result)
  }
};

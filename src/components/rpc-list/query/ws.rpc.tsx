import { IData, RPC_TIMEOUT } from './constants'

export async function fetchWsRpcData (url: string): Promise<IData> {
  return await new Promise<IData>((resolve, reject) => {
    const socket = new WebSocket(url)
    let startedAt: number

    const timeout = setTimeout(() => {
      reject(new Error('Timeout'))
    }, RPC_TIMEOUT)

    socket.onopen = () => {
      startedAt = Date.now()
    }

    socket.onmessage = (event) => {
      try {
        clearTimeout(timeout)
        const data: IData = JSON.parse(event.data)
        console.log('🚀 WS ~ file: rpc.helper.tsx:51 ~ fetchWssChain ~ data', data)
        const latency = Date.now() - startedAt
        resolve({ block: 0, latency })
      } catch (error) {
        reject(error)
      }
    }

    socket.onerror = (error) => {
      reject(error)
    }
  })
};

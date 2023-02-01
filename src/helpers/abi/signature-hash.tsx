import oAbiCoder from 'web3-eth-abi'

import { AbiItem, AbiCoder } from 'types/abi'



export const abiCoder = oAbiCoder as unknown as AbiCoder

export function generateAbiSignatureHash(abi: AbiItem[]) {
  const interfaceId = abi.reduce<bigint>((prev, item) => {
    if (item.type === 'event') {
      return prev
    }
    const selector = abiCoder.encodeFunctionSignature(item)
    const hex = BigInt(parseInt(selector, 16))
    if (prev) {
      const result = prev ^ hex
      return result
    }
    return hex
  }, BigInt(0))
  return '0x' + interfaceId.toString(16)
}




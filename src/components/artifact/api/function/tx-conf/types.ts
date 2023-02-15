import { TransactionConfig } from 'types/abi'

export type TxConfKey = keyof TransactionConfig


export const TxConfTypeByKey: Partial<Record<TxConfKey, string>> = {
  from: 'address',
  value: 'uint256',
  gas: 'uint256',
  gasPrice: 'uint256',
  nonce: 'uint256'
}

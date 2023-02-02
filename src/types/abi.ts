import type { AbiItem } from 'web3-utils'

export interface IArtifact {
  hash: string
  name: string
}

export interface IArtifactWithAbi {
  hash: string
  name: string
  abi: AbiItem[]
}

export type { AbiItem, AbiInput, AbiOutput } from 'web3-utils'
export type { TransactionConfig } from 'web3-core'
export type { AbiCoder } from 'web3-eth-abi'

import type { AbiItem } from 'web3-utils'
import type { TransactionConfig as oTxConf } from 'web3-core'

export interface IArtifact {
  hash: string
  name: string
}

export interface IArtifactWithAbi {
  hash: string
  name: string
  abi: AbiItem[]
}

export interface TransactionConfig extends oTxConf {
  value: string | number;
  gasPrice: string | number;
}

export type { AbiItem, AbiInput, AbiOutput, StateMutabilityType, AbiType } from 'web3-utils'
export type { TransactionReceipt, PromiEvent } from 'web3-core';
export type { AbiCoder } from 'web3-eth-abi'

import oAbiCoder from 'web3-eth-abi'

import { SafeError } from 'types/common'
import { AbiItem, AbiCoder } from 'types/abi'

import { safe, safeObj } from '../safe'


export const abiCoder = oAbiCoder as unknown as AbiCoder

export function generateAbiHash(abi: AbiItem[]) {
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

type AbiGetter = () => AbiItem[]
export class Artifact {
  name: string
  originalHash: string | undefined
  actualHash: string | undefined
  getAbi: AbiGetter

  constructor(name: string, abiGetter: AbiGetter, oHash?: string) {
    this.name = name
    this.originalHash = oHash
    this.getAbi = abiGetter
  }

  get abi(): AbiItem[] {
    return this.getAbi()
  }

  setAbi(abi: AbiItem[], originalHash?: string) {
    this.getAbi = () => abi
    if (this.originalHash) {
      this.originalHash = originalHash
    } else {
      this.actualHash = generateAbiHash(abi)
    }
  }

  get hash(): string {
    if (this.originalHash) {
      return this.originalHash
    }
    if (!this.actualHash) {
      this.actualHash = generateAbiHash(this.abi)
    }
    return this.actualHash
  }

  get uid() {
    return `${this.hash}-${this.name}`
  }

  toJSON() {
    return {
      name: this.name,
      abi: this.abi
    }
  }

  toString() {
    return JSON.stringify(this.toJSON())
  }

  // TODO: use private constructor
  static fromString(value: string) {
    const [jsonError, json] = safe(() => JSON.parse(value))
    if (jsonError != null) {
      throw new Error('Artifact.fromString: invalid json: ' + jsonError.message)
    }
    if (typeof json !== 'object') {
      throw new Error('Artifact.fromString: json not object')
    }
    if (typeof json.name !== 'string') {
      throw new Error('Artifact.fromString: json.name not string')
    }
    if (typeof json.abi !== 'object') {
      throw new Error('Artifact.fromString: json.abi not object')
    }
    const [hashError, hash] = safe(() => generateAbiHash(json.abi))
    if (hashError != null) {
      throw new Error('Artifact.fromString: invalid abi: ' + hashError.message)
    }
    return new Artifact(json.name, () => json.abi, hash)
  }
}

export interface GetArtifactError {
  title: string
  details: string
}

interface DecodeAndValidateAbiResult {
  abi: AbiItem[]
  hash: string
}
export function safeDecodeAndValidateAbi(value: string): [undefined, DecodeAndValidateAbiResult] | [SafeError, undefined] {
  const [jsonError, json] = safe(() => JSON.parse(value))
  if (jsonError != null) {
    const error = { message: 'Invalid JSON', details: jsonError.message }
    return [error, undefined]
  }

  if (!Array.isArray(json)) {
    const error = { message: 'Invalid ABI', details: 'Not an array' };
    return [error, undefined]
  }

  if (json.length === 0) {
    const error = { message: 'Invalid ABI', details: 'ABI cannot be empty' };
    return [error, undefined]
  }

  const hash = safeObj(() => generateAbiHash(json))
  if (hash.error != null) {
    const error = { message: 'Invalid ABI', details: hash.error.message }
    return [error, undefined]
  }
  return [undefined, { abi: json, hash: hash.result }]
}

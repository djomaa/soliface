import { safe } from 'helpers/safe'
import { AbiItem } from 'types/abi'

import { generateAbiHash } from './signature-hash'

type AbiGetter = () => AbiItem[]
/**
 * @deprecated
 */
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

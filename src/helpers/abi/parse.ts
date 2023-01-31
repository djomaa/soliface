import { AbiItem } from 'types/abi'
import { SafeError } from 'types/common'
import { safe, safeObj } from 'helpers/safe'

import { generateAbiHash } from './signature-hash'

interface DecodeAndValidateAbiResult {
  abi: AbiItem[]
  hash: string
}
export function safeAbiFromString(value: string): [undefined, DecodeAndValidateAbiResult] | [SafeError, undefined] {
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

import assert from 'assert';
import { AbiItem, StateMutabilityType } from 'types/abi';

export function searchAbiItem(abi: AbiItem[], query: string) {
  const reQuery = new RegExp(query, 'i')
  const mutabilityQuery = new RegExp(`\\b${query}\\b`, 'i');
  const mutability: Record<StateMutabilityType, boolean> = {
    payable: mutabilityQuery.test('payable'),
    view: mutabilityQuery.test('view'),
    pure: mutabilityQuery.test('pure'),
    nonpayable: mutabilityQuery.test('nonpayable'),
  }
  const result = abi.filter((item) => {
    if (item.name && reQuery.test(item.name)) {
      return true;
    }
    if (item.type && reQuery.test(item.type)) {
      return true;
    }
    for (const key in mutability) {
      assert(item.stateMutability);
      if (mutability[item.stateMutability] && item.stateMutability === key) {
        return true;
      }
    }
    return false;
  })
  return result
}


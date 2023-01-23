import { useState } from 'react'
import { ChainList } from 'constants/chain-list'
import { Chain } from 'types/chain'
import { hexToNumber } from 'utils/number.utils'

export const useChainList = () => {
  const [chainList, setChainList] = useState(ChainList)

  return { chainList }
}

export function searchChain (list: Chain[], query: string) {
  console.log('asdasd')
  // TODO:- add timings for filtering and mapping
  const regExpQuery = new RegExp(query, 'i')
  const numberQuery = Number(query)
  const isNumber = !Number.isNaN(numberQuery)
  const hexQuery = hexToNumber(query)
  const isHex = !Number.isNaN(hexQuery)

  const filtered = list.filter((chain) => {
    if (chain.name.match(regExpQuery) != null) {
      return true
    }
    if (chain.shortName.match(regExpQuery) != null) {
      return true
    }
    if (isNumber && chain.chainId === numberQuery) {
      return true
    }
    if (isHex && chain.chainId === hexQuery) {
      return true
    }
    return false
  })

  return filtered
}

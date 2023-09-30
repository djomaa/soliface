import { DepcrecatedChainType, IExplorer } from 'types/chain'

export const generateTxLink = (explorer: IExplorer, txHash: string) => {
  if (explorer.standard === 'EIP3091') {
    const url = new URL(`tx/${txHash}`, explorer.url)
    return url.toString()
  }
}

export function generateTxLinkByChain(chain: DepcrecatedChainType, txHash: string) {
  if (chain.explorers == null) {
    return
  }
  for (const explorer of chain.explorers) {
    const link = generateTxLink(explorer, txHash)
    if (link) {
      return link
    }
  }
}

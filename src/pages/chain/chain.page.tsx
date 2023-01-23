import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'

import { Data } from 'components/chain'
import { useChainList } from 'hooks/use-chain-list'

import { useAppTitle } from 'hooks/use-app-title'
import { Chain } from 'types/chain'
import { ChainCtxProvider } from 'contexts/chain'
import { ChainPageAppBar } from './components/app-bar'

export const ValidChainPageContent: React.FC<Chain> = (chain) => {
  useAppTitle(`Chain ${chain.name}`)
  return <Data {...chain} />
}

interface IInvalidChainProps {
  reason: string;
}
export const InvalidChainPageContent: React.FC<IInvalidChainProps> = ({ reason }) => {
  useAppTitle('Chain not found');
  return (
    <Container>
      <Alert severity='warning'>
        {`Invalid chain id. ${reason}`}
      </Alert>
    </Container >
  )
}

export const ChainPageContent: React.FC = () => {
  const params = useParams()
  const { chainList } = useChainList()

  const chainId = useMemo(() => {
    const chainId = Number(params.id)
    return Number.isNaN(chainId) ? null : chainId;
  }, [params]);

  const chain = useMemo(() => {
    if (chainId === null) {
      return;
    }
    const chain = chainList.find((c) => c.chainId === chainId)
    return chain;
  }, [chainId, chainList]);

  if (chainId === null) {
    return <InvalidChainPageContent reason={`Invalid chain id "${params.id}"`} />
  }
  if (chain === undefined) {
    return <InvalidChainPageContent reason={`Chain not found. Given id: ${chainId}`} />
  }

  return <ValidChainPageContent {...chain} />
}

export const ChainPage: React.FC = () => {
  return (
    <ChainCtxProvider>
      <ChainPageAppBar />
      <Container>
        <ChainPageContent />
      </Container>
    </ChainCtxProvider>
  )
}

import React, { useMemo } from 'react'
import { useParams } from 'react-router-dom'

import Alert from '@mui/material/Alert'
import Container from '@mui/material/Container'

import { Data } from 'components/chain'
import { ChainCtxProvider } from 'contexts/web3'
import { useChainList } from 'hooks/use-chain-list'

import { ChainPageAppBar } from './components/app-bar'

export const ChainPage: React.FC = () => {
  const params = useParams()
  const { chainList } = useChainList()

  const content = useMemo(() => {
    const chainId = Number(params.id)
    if (Number.isNaN(chainId)) {
      return (
        <Alert severity='warning'>
          {`Invalid chain id. Given value: "${params.id}"`}
        </Alert>
      )
    }
    const chain = chainList.find((c) => c.chainId === chainId)
    if (chain == null) {
      return (
        <Alert severity='warning'>
          {`Chain not found. Given id: "${params.id}"`}
        </Alert>
      )
    }

    return <Data {...chain} />
  }, [params, chainList])

  return (
    <ChainCtxProvider>
      <ChainPageAppBar />
      <Container>
        {content}
      </Container>
    </ChainCtxProvider>
  )
}

import React, { useMemo } from 'react'
import Container from '@mui/material/Container'

import { ChainCtxProvider } from 'contexts/web3';
import { ChainManager } from 'components/chain-manager';
import { useParams } from 'react-router-dom';
import { Page404 } from 'pages/page-404';
import Alert from '@mui/material/Alert';
import { Data } from 'components/chain';
import { useChainList } from 'hooks/use-chain-list';
import { ChainPageAppBar } from './components/app-bar';

export const ChainPage: React.FC = () => {
  const params = useParams();
  const { chainList } = useChainList();

  const content = useMemo(() => {
    const chainId = Number(params.id);
    if (Number.isNaN(chainId)) {
      return (
        <Alert severity='warning'>
          {`Invalid chain id. Given value: "${params.id}"`}
        </Alert>
      )
    }
    const chain = chainList.find((c) => c.chainId === chainId);
    if (!chain) {
      return (
        <Alert severity='warning'>
          {`Chain not found. Given id: "${params.id}"`}
        </Alert>
      )
    }

    return <Data {...chain} />
  }, [params, chainList]);




  return (
    <ChainCtxProvider>
      <ChainPageAppBar />
      <Container>
        {content}
      </Container>
    </ChainCtxProvider>
  )
}

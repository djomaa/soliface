import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import Container from '@mui/material/Container'

import { Route } from 'constants/route'
import { AppBar } from 'components/app-bar'
import { FallbackPage } from 'pages/fallback.page'
import { Exists, useArtifact } from 'hooks/use-artifact'
import { CircularProgress } from '@mui/material'
import { EditArtifact } from 'components/artifact/edit'

export const ArtifactContent: React.FC<{ artifact: Exists }> = ({ artifact }) => {
  const navigate = useNavigate();

  if (artifact.loading) {
    return <CircularProgress />
  }

  return <EditArtifact
    artifact={artifact}
    onClose={() => {
      navigate(Route.AbiManager)
    }}
  />
}

export const ValidContent: React.FC<{ hash: string }> = (props) => {
  const artifact = useArtifact(props.hash);

  if (!artifact.isExist) {
    return <FallbackPage title='Artifact not found' text={`Artifact with hash ${props.hash} not found`} />
  }

  return <ArtifactContent artifact={artifact} />

}


export const EditArtifactPageContent: React.FC = () => {
  const params = useParams()
  const hash = useMemo(() => {
    return params.hash;
  }, [params]);

  if (!hash) {
    return <FallbackPage title='Edit artifact' text={`Invalid hash ${hash}`} />
  }

  return <ValidContent hash={hash} />
}

export const EditArtifactPage: React.FC = () => {
  return (
    <>
      <AppBar />
      <Container>
        <EditArtifactPageContent />
      </Container>
    </>
  )
}

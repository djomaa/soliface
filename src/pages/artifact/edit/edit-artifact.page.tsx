import React, { useMemo } from 'react'
import { useNavigate, useParams } from 'react-router-dom'

import CircularProgress from '@mui/material/CircularProgress'

import { Route } from 'constants/route'
import { FallbackPage } from 'pages/fallback.page'
import { EditArtifact } from 'components/artifact/edit'
import { LoadedExists, useArtifact } from 'hooks/use-artifact'

export const ArtifactContent: React.FC<{ artifact: LoadedExists }> = ({ artifact }) => {
  const navigate = useNavigate();

  if (artifact.loading) {
    return <CircularProgress />
  }

  return <EditArtifact
    artifact={artifact}
    onClose={() => {
      navigate(Route.ArtifactManager)
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
    <EditArtifactPageContent />
  )
}

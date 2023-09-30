import React from 'react'
import Button from '@mui/material/Button'
import { modal } from 'libs/modals'
import { GenerateLinkModal } from './generate-link.modal'
import { useArtifact } from 'hooks/use-artifact'
import { useContractCtx } from 'contexts/contract'

interface ICoreProps {
  address: string | undefined;
  artifactHash: string;
}
export const ContractToolbar: React.FC<ICoreProps> = (props) => {
  const ctx = useContractCtx()
  const artifact = useArtifact(props.artifactHash);

  return (
    <Button
      disabled={artifact.loading || !!artifact.error}
      onClick={() => {
        // modal.show(GenerateLinkModal, { address: props.address, abi: artifact.abi });
      }}
    >Generate link</Button>
  )
}

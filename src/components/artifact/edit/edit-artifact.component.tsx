import { LoadedExists } from 'hooks/use-artifact';
import React, { useMemo } from 'react'


import { AddAbi, IAddAbiProps } from '../create'

interface IProps extends Pick<IAddAbiProps, 'onClose'> {
  artifact: LoadedExists;
}
export const EditArtifact: React.FC<IProps> = ({ artifact, ...props }) => {
  const formatted = useMemo(() => {
    if (artifact.error) {
      return artifact.rawAbi;
    }
    return JSON.stringify(artifact.abi, null, 2);
  }, [artifact]);

  return (
    <AddAbi
      name={artifact.name}
      strAbi={formatted}
      {...props}
    />
  )
}

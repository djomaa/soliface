import React from 'react'
import { AbiItem } from 'types/abi'
import { ArtifactCtxProvider, IArtifactCtxProps } from './ctx'
import { Function } from './function';

interface IProps extends IArtifactCtxProps {
  abi: AbiItem[];
}
const ArtifactApiCore: React.FC<IProps> = (props) => {
  const functions = React.useMemo(() => {
    return props.abi
      .filter((abi) => abi.type === 'function')
      .map((abi, i) => {
        // TODO: set normal key
        return <Function key={i} abi={abi} />
      })
  }, [props.abi]);

  return (
    <ArtifactCtxProvider {...props}>
      {functions}
    </ArtifactCtxProvider>
  )
}


export const ArtifactApi: React.FC<IProps> = (props) => {

  return (
    <ArtifactCtxProvider {...props}>
      <ArtifactApiCore {...props} />
    </ArtifactCtxProvider>
  )

}

import React, { useRef } from 'react'

import Box from '@mui/system/Box'

import { AddAbiCtxProvider } from './ctx'
import { Stepper } from './create-artifact.stepper'
import { AbiStep } from './create-artifact.abi-step'
import { DoneStep } from './create-artifact.done-step'
import { DetailsStep } from './create-artifact.details-step'

interface ICoreProps {
  strAbi?: string;
  scrollTargetRef?: React.RefObject<HTMLElement>;
}
const CreateArtifactCore: React.FC<ICoreProps> = (props) => {
  const ref = useRef<HTMLElement>()

  return (
    <Box ref={ref}>
      <Stepper containerRef={ref} scrollTargetRef={props.scrollTargetRef} />
      <AbiStep strAbi={props.strAbi} />
      <DetailsStep />
      <DoneStep />
    </Box>
  )
}

export interface IAddAbiProps extends ICoreProps {
  name?: string;
  onClose?: () => void;
}
export const AddAbi: React.FC<IAddAbiProps> = ({ onClose, name, ...props }) => {
  return (
    <AddAbiCtxProvider onClose={onClose} name={name}>
      <CreateArtifactCore {...props} />
    </AddAbiCtxProvider>
  )
}

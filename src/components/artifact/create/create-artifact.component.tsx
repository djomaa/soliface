import React, { useRef } from 'react'

import Box from '@mui/system/Box'

import { AddAbiCtxProvider } from './ctx'
import { Stepper } from './create-artifact.stepper'
import { AbiStep } from './create-artifact.abi-step'
import { DoneStep } from './create-artifact.done-step'
import { DetailsStep } from './create-artifact.details-step'

interface ICoreProps {
  scrollTargetRef?: React.RefObject<HTMLElement>;
}
const AddAbiCore: React.FC<ICoreProps> = (props) => {
  const ref = useRef<HTMLElement>()

  return (
    <Box ref={ref}>
      <Stepper containerRef={ref} scrollTargetRef={props.scrollTargetRef} />
      <AbiStep />
      <DetailsStep />
      <DoneStep />
    </Box>
  )
}

interface IProps {
  onClose?: () => void;
  scrollTargetRef?: React.RefObject<HTMLElement>;
}
export const AddAbi: React.FC<IProps> = (props) => {
  return (
    <AddAbiCtxProvider onClose={props.onClose}>
      <AddAbiCore {...props} />
    </AddAbiCtxProvider>
  )
}

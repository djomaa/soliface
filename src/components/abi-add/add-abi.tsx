import Box from '@mui/system/Box'
import React, { useRef } from 'react'
import { AbiStep } from './add-abi.abi-step'
import { DetailsStep } from './add-abi.details-step'
import { DoneStep } from './add-abi.done-step'
import { Stepper } from './add-abi.stepper'
import { AddAbiCtxProvider } from './ctx'

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

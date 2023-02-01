import React, { useEffect, useState } from 'react'

import Box from '@mui/system/Box';
import Step from '@mui/material/Step'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import MuiStepper from '@mui/material/Stepper'
import StepLabel from '@mui/material/StepLabel'
import ButtonGroup from '@mui/material/ButtonGroup';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import useScrollTrigger from '@mui/material/useScrollTrigger';
import { UseScrollTriggerOptions } from '@mui/material/useScrollTrigger/useScrollTrigger';

import { CreateArtifactStep, useCreateAbiCtx } from './ctx';

interface Props {
  children: React.ReactElement;
  target: UseScrollTriggerOptions['target'];
}

function ElevationScroll(props: Props) {
  const { children, target } = props;
  // Note that you normally won't need to set the window ref as useScrollTrigger
  // will default to window.
  // This is only being set here because the demo is in an iframe.
  const trigger = useScrollTrigger({
    disableHysteresis: false,
    threshold: 0,
    target: target,
  });
  console.log('SCROLL', !!target, target, trigger);


  return React.cloneElement(children, {
    style: {
      borderBottom: trigger ? '1px solid gray' : '',
    }
    // elevation: trigger ? 4 : 0,
  });
}

enum StepValue {
  Abi = 'ABI',
  Details = 'Details',
}

interface IProps {
  containerRef: React.RefObject<HTMLElement | undefined>;
  scrollTargetRef?: React.RefObject<HTMLElement>;
}

export const Stepper: React.FC<IProps> = ({ containerRef: ref, ...props }) => {
  const ctx = useCreateAbiCtx();
  const [pos, setPos] = useState<number>();

  useEffect(() => {
    if (!ref.current) {
      setPos(undefined);
      return;
    }
    const { y } = ref.current.getBoundingClientRect();
    setPos(y);
  }, [ref])

  return (
    <ElevationScroll
      target={props.scrollTargetRef?.current ?? undefined}
    >
      <Box
        sx={{
          paddingTop: '3vh',
          paddingBottom: '2vh',
          zIndex: 1099,
          backgroundColor: 'white',
          ...(pos ? { position: 'sticky', top: pos } : {})
        }}
      >
        <Grid container justifyContent='space-between' alignItems='center'>
          <Grid xs={12} md>
            <MuiStepper activeStep={ctx.step}>
              <Step>
                <StepLabel>{StepValue.Abi}</StepLabel>
              </Step>
              <Step
                disabled={!ctx.abi}
              >
                <StepLabel>{StepValue.Details}</StepLabel>
              </Step>
            </MuiStepper>
          </Grid>
          {ctx.step < CreateArtifactStep.Done && (
            <Grid xs={12} md={2}>
              <Stack direction='row' justifyContent='center'>
                <ButtonGroup variant="outlined">
                  <Button
                    disabled={ctx.step === 0}
                    onClick={() => ctx.setStep(ctx.step - 1)}
                  >
                    Back
                  </Button>
                  <Button
                    disabled={
                      ctx.step === CreateArtifactStep.Details
                      || (ctx.step === CreateArtifactStep.ABI && !ctx.abi)
                    }
                    onClick={() => ctx.setStep(ctx.step + 1)}
                  >
                    Next
                  </Button>
                </ButtonGroup>
              </Stack>
            </Grid>
          )}
        </Grid>
      </Box>
    </ElevationScroll>
  )
}

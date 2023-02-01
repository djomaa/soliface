import React from 'react'

import Stack from '@mui/material/Stack'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { Inputs } from './inputs'
// import { MethodActions } from './actions'
import { FunctionCtxProvider, useFunctionCtx } from './ctx'
import { AbiItem } from 'types/abi'
import assert from 'assert'

// TODO: use full fn description name(params): outputs(if overloads exists)
export const FunctionCore: React.FC = (props) => {
  const { abi } = useFunctionCtx();

  const [open, setOpen] = React.useState(false);

  return (
    <Accordion
      expanded={open}
      TransitionProps={{ unmountOnExit: true }}
      onChange={() => { setOpen((prev) => !prev) }}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {abi.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        {/* <FormContainer formContext={ctx.form}> */}
        <Stack spacing={1.5}>
          <Inputs />
        </Stack>
        {/* </FormContainer> */}
      </AccordionDetails>
    </Accordion>
  )

}

interface IProps {
  abi: AbiItem;
}
export const Function: React.FC<IProps> = (props) => {

  console.log('Function render counter');
  assert(props.abi.type === 'function');

  return (
    <FunctionCtxProvider abi={props.abi}>
      <FunctionCore />
    </FunctionCtxProvider>
  )
}

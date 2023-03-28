import React from 'react'

import Box from '@mui/material/Box'
import Divider from '@mui/material/Divider'
import Accordion from '@mui/material/Accordion'
import Typography from '@mui/material/Typography'
import ExpandMore from '@mui/icons-material/ExpandMore'
import AccordionSummary from '@mui/material/AccordionSummary'
import AccordionDetails from '@mui/material/AccordionDetails'

import { Child } from 'components/child'
import { withCtx } from 'contexts/ctx-factory'
import { FunctionRepresentation } from 'helpers/abi/function'

import { Inputs } from './inputs'
import { TxConf } from './tx-conf'
import { Actions } from './actions'
import { FunctionCtxProvider, useFunctionCtx } from './ctx'

// TODO: use full fn description name(params): outputs(if overloads exists)
export const FunctionCore: React.FC = (props) => {
  const { abi, result } = useFunctionCtx();

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
        <Typography variant='subtitle1'>
          <FunctionRepresentation abi={abi} />
        </Typography>
      </AccordionSummary>
      <AccordionDetails
        sx={{
          padding: 0,
        }}
      >
        <Box>
          <Inputs />
          <TxConf />
          <Actions />
          {result && (
            <>
              <Divider />
              {/* <Grow
                in={true}
              > */}
              <Child x y>
                {result}
              </Child>
              {/* </Grow> */}
            </>
          )}
        </Box>
      </AccordionDetails>
    </Accordion>
  )

}

export const Function = withCtx(FunctionCtxProvider, FunctionCore);

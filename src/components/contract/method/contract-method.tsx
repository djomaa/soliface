import React, { useState } from 'react';
import { FormContainer } from 'react-hook-form-mui';
import { ExpandMore } from '@mui/icons-material';
import { Stack, Accordion, AccordionSummary, Typography, AccordionDetails, Tooltip, Divider, Box, Container, ButtonGroup } from '@mui/material';
import { MethodInputs } from './inputs';
import { MethodResult } from './result';
import { MethodActions } from './actions';
import { useMethodCtx } from './context';

interface iProps {
}
export const ContractMethodBody: React.FC<iProps> = () => {
  const [open, setOpen] = useState(false);
  const ctx = useMethodCtx();

  return (
    <Accordion
      expanded={open}
      TransitionProps={{ unmountOnExit: true }} 
      onChange={() => setOpen((prev) => !prev)}
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
      >
        <Typography sx={{ width: '33%', flexShrink: 0 }}>
          {ctx.abi.name}
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <Divider />
        <FormContainer formContext={ctx.form}>
          <Stack spacing={1.5}>
            <MethodInputs />
            <MethodActions />
            <MethodResult />
          </Stack>
        </FormContainer>
      </AccordionDetails>
    </Accordion>
  )
}

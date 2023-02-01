import React from 'react';
import { useFunctionCtx } from '../ctx';
import Stack from '@mui/material/Stack';
import { Input } from './input.component';
import { FormContainer } from 'react-hook-form-mui';
import AccordionDetails from '@mui/material/AccordionDetails';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import Typography from '@mui/material/Typography';
import ExpandMore from '@mui/icons-material/ExpandMore'

interface IProps {
  // inputs: AbiInput[];
}

const InputsCore: React.FC<IProps> = () => {
  const [open, setOpen] = React.useState(false);
  const { abi, inputsForm } = useFunctionCtx();

  const elements = React.useMemo(() => {
    return abi.inputs?.map((input, i) => {
      return <Input key={input.name} input={input} position={['params', i]} path={[input.name]} />
    })
  }, [abi]);

  return (
    <Accordion
      expanded={open}
      TransitionProps={{ unmountOnExit: true }}
      onChange={() => { setOpen((prev) => !prev) }}
      elevation={0}
      variant='outlined'
      // disableGutters
      square
    >
      <AccordionSummary
        expandIcon={<ExpandMore />}
        sx={{
          flexDirection: 'row-reverse',
        }}
      >
        <Typography variant='body1'>
          arguments
        </Typography>
      </AccordionSummary>
      <AccordionDetails>
        <FormContainer formContext={inputsForm}>
          <Stack spacing={1}>
            {elements}
          </Stack>
        </FormContainer>
      </AccordionDetails>
    </Accordion>
  );
}

export const Inputs: React.FC<IProps> = () => {
  const { abi } = useFunctionCtx();
  if (!abi.inputs || !abi.inputs.length) {
    return <></>
  }
  return <InputsCore />
}

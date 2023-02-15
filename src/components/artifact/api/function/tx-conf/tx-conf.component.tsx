import React from 'react'
import { useToggle } from 'react-use'
import { FormContainer } from 'react-hook-form-mui'
import { TransitionGroup } from 'react-transition-group'


import Box from '@mui/system/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'

import { useLogger } from 'hooks/use-logger'

import { Child } from '../child'
import { useFunctionCtx } from '../ctx'
import { Collapser } from '../collapser'


import { TxConfKey, TxConfTypeByKey } from './types'
import { TxConfInputMap } from './tx-conf.inputs'
import { BaseInput } from '../inputs/base/base-input'

export const TxConfCore: React.FC = (props) => {
  const [Logger] = useLogger(TxConfCore);

  const { abi } = useFunctionCtx();
  const [open, toggleOpen] = useToggle(false)

  const fields = React.useMemo<TxConfKey[]>(() => {
    if (!open && abi.payable) {
      return ['value'];
    } else {
      return ['value', 'from', 'gas', 'gasPrice', 'nonce'];
    }
  }, [abi, open]);

  const inputs = React.useMemo(() => {
    return fields.map((key) => {
      const CustomInput = TxConfInputMap[key];
      if (CustomInput) {
        return <CustomInput key={key} />
      }
      return (
        <Collapse key={key} in={true}>
          <BaseInput
            position={[key]}
            path={[key]}
            type={TxConfTypeByKey[key] ?? 'hex'}
          />
        </Collapse>
      )
    })
  }, [fields])

  return (
    <Box>
      <Stack direction='row' spacing={1}>
        {abi.stateMutability === 'payable' && (
          <Button
            variant='outlined'
            color='secondary'
            size='small'
            onClick={toggleOpen}
          >
            {open ? 'show less' : 'Show all'}
          </Button>
        )}
      </Stack>
      <Stack>
        <TransitionGroup>
          {inputs}
        </TransitionGroup>
      </Stack>
    </Box>
  )
}

export const TxConf: React.FC = () => {
  const { txConfForm, abi } = useFunctionCtx();
  const [open, setOpen] = React.useState(!!abi.payable);

  return (
    <Collapser
      open={open}
      setOpen={setOpen}
      text='Transaction Configuration'
    >
      <Child x>
        <FormContainer formContext={txConfForm}>
          <TxConfCore />
        </FormContainer>
      </Child>
    </Collapser>
  )
}

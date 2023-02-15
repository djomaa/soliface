import React from 'react'
import { useToggle } from 'react-use'
import { FormContainer } from 'react-hook-form-mui'
import { TransitionGroup } from 'react-transition-group'

import Box from '@mui/material/Box'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Collapse from '@mui/material/Collapse'

import { Child } from 'components/child'
import { useLogger } from 'hooks/use-logger'
import { PrimitiveInput } from 'components/abi-inputs/primitive'
import style from 'components/abi-inputs/abi-inputs.module.scss'

import { useFunctionCtx } from '../ctx'
import { Collapser } from '../collapser'


import { TxConfInputMap } from './tx-conf.inputs'
import { TxConfKey, TxConfTypeByKey } from './types'


export const TxConfCore: React.FC = (props) => {
  const [Logger] = useLogger(TxConfCore);

  const { abi, txConfForm } = useFunctionCtx();
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
          <PrimitiveInput
            labels={[key]}
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
        <FormContainer formContext={txConfForm}>
          <TransitionGroup className={style.Container}>
            {inputs}
          </TransitionGroup>
        </FormContainer>
      </Stack>
    </Box>
  )
}

export const TxConf: React.FC = () => {
  const { abi } = useFunctionCtx();
  const [open, setOpen] = React.useState(!!abi.payable);

  return (
    <Collapser
      open={open}
      setOpen={setOpen}
      text='Transaction Configuration'
    >
      <Child x y>
        <TxConfCore />
      </Child>
    </Collapser >
  )
}

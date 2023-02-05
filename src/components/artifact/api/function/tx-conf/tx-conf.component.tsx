import React, { useMemo, useState } from 'react'

import Stack from '@mui/material/Stack'


import { MethodInput } from '../inputs/base/base.input'
import { FormContainer } from 'react-hook-form-mui'
import { useFunctionCtx } from '../ctx'


import { Collapser } from '../collapser'
import { Child } from '../child'
import Button from '@mui/material/Button'
import { Collapse } from '@mui/material'
import { useToggle } from 'react-use'
import { TransitionGroup } from 'react-transition-group'
import Box from '@mui/system/Box'
import { useWeb3 } from 'contexts/chain'
import assert from 'assert'
import { useIsMounted } from 'hooks/use-is-mounted'
import { useLogger } from 'hooks/use-logger'
import { TxConfKey, TxConfTypeByKey } from './types'
import { TxConfInputMap } from './tx-conf.inputs'

export const TxConfCore: React.FC = (props) => {
  const [Logger] = useLogger(TxConfCore);

  const { abi, txConfForm } = useFunctionCtx();
  const { web3 } = useWeb3();
  const [open, toggleOpen] = useToggle(false)
  const { isMounted } = useIsMounted();

  const fetchGasPrice = React.useCallback(async () => {
    try {
      assert(web3);
      const gasPrice = await web3.eth.getGasPrice();
      if (!isMounted()) {
        return;
      }
      txConfForm.setValue('gasPrice', gasPrice);
    } catch (error) {
      Logger.sub('getGasPrice').error('Failed', error);
    }
  }, [web3])

  const fields = useMemo<TxConfKey[]>(() => {
    if (!open && abi.payable) {
      return ['value'];
    } else {
      return ['value', 'from', 'gas', 'gasPrice', 'nonce'];
    }
  }, [abi, open]);


  const inputs = useMemo(() => {
    return fields.map((key) => {
      const CustomInput = TxConfInputMap[key];
      if (CustomInput) {
        return <CustomInput />
      }
      return (
        <Collapse in={true} key={key}>
          <MethodInput
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
  const [open, setOpen] = useState(!!abi.payable);

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

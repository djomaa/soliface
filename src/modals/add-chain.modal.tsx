import { useAsync } from 'react-use'
import React, { useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Alert from '@mui/material/Alert'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TabContext from '@mui/lab/TabContext'
import AlertTitle from '@mui/material/AlertTitle'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'
import CircularProgress from '@mui/material/CircularProgress'

import { Chain } from 'types/chain'
import { AsyncModal } from 'contexts/modal'
import { useChainCtx } from 'contexts/web3'
import { JsonBox } from 'components/json-box'
import style from 'styles/dialog.module.scss'

interface IProps {
  chain: Chain
}

enum TabValue {
  View = 'View',
  Result = 'Result',
}

const Tabs = Object.entries(TabValue) as Array<[value: string, label: string]>

export const AddChainModal: AsyncModal<IProps> = (props) => {
  const chainCtx = useChainCtx()
  const [tab, setTab] = useState(TabValue.Result)

  const state = useAsync(async () => {
    await chainCtx.addChain(props.chain)
  }, [chainCtx.addChain, props.chain])

  return (
    <Dialog open={true} scroll='paper' fullWidth={true} classes={{
      scrollPaper: style.DialogContainer,
      paperScrollBody: style.DialogContainer
    }}>
      <DialogTitle>Add chain to wallet</DialogTitle>
      <DialogContent>
        <TabContext value={tab}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <TabList onChange={(_, tab) => { setTab(tab) }}>
              {Tabs.map(([value, label]) => {
                return <Tab key={value} label={label} value={value} />
              })}
            </TabList>
            <Button
              variant='outlined'
              startIcon={<CloseIcon />}
              onClick={props.handleClose}
            >
              Close
            </Button>
          </Stack>
          <TabPanel value={TabValue.View}>
            <JsonBox value={props.chain} />
          </TabPanel>
          <TabPanel value={TabValue.Result}>
            {state.loading && (
              <Stack direction='row' justifyContent='space-around'>
                <CircularProgress />
              </Stack>
            )}
            {(state.error != null) && (
              <Alert severity='error'>
                <AlertTitle>{state.error.message}</AlertTitle>
                {state.error.message}
              </Alert>
            )}
            {!state.loading && (state.error == null) && (
              <Alert severity="info">Done</Alert>
            )}
          </TabPanel>
        </TabContext>
      </DialogContent>
    </Dialog >
  )
}

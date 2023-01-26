import React, { useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import Dialog from '@mui/material/Dialog'
import TabContext from '@mui/lab/TabContext'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { Chain } from 'types/chain'
import { useChainCtx } from 'contexts/chain'
import style from 'styles/dialog.module.scss'
import { useDefaultRpc } from 'hooks/use-default-rpc'
import { AsyncModal, useModalCtx } from 'contexts/modal'

import { RpcList } from 'components/rpc-list/rpc-list'
import { Typography } from '@mui/material'
import { useLogger } from 'hooks/use-logger'
import { ConnectChainToast } from './connect-chain.toast'

interface IProps {
  chain: Chain
}

enum TabValue {
  Rpc = 'Rpc',
}

const Tabs = Object.entries(TabValue) as Array<[value: string, label: string]>

export const ChangeChainModal: AsyncModal<IProps> = ({ chain, ...props }) => {
  const [Logger, { logState }] = useLogger(ChangeChainModal.name, chain.chainId)
  const chainCtx = useChainCtx()
  const modalCtx = useModalCtx()
  const [defaultRpc] = useDefaultRpc(chain.chainId)
  const [tab, setTab] = useState(TabValue.Rpc)

  logState('defaultRpc', defaultRpc)

  const handleConnect = () => {
    props.handleClose()
    modalCtx.addModal(ConnectChainToast, { chain })
  }

  if (defaultRpc) {
    return <ConnectChainToast chain={chain} {...props} />
  }

  return (
    <Dialog open={true} scroll='paper' fullWidth={true} classes={{
      scrollPaper: style.DialogContainer,
      paperScrollBody: style.DialogContainer
    }}>
      <DialogTitle>Connect to chain</DialogTitle>
      <DialogContent>
        <TabContext value={tab}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <TabList>
              {Tabs.map(([value, label]) => {
                return (
                  <Tab
                    key={value}
                    label={label}
                    value={value}
                  />
                )
              })}
            </TabList>
            <Stack direction='row' spacing={0.5}>
              <Button
                variant='outlined'
                onClick={() => { handleConnect() }}
                disabled={!defaultRpc}
              >
                Connect
              </Button>
              <Button
                variant='outlined'
                startIcon={<CloseIcon />}
                onClick={props.handleClose}
                color='error'
              >
                Close
              </Button>
            </Stack>
          </Stack>
          <TabPanel value={TabValue.Rpc}>
            <Typography variant='body2'>
              It's first time you are connecting to this chain, so you need to specify default RPC.
            </Typography>
            <Typography variant='body2'>
              You can always change it in chains section.
            </Typography>
            <RpcList {...chain} />
          </TabPanel>
        </TabContext>
      </DialogContent>

    </Dialog >
  )
}
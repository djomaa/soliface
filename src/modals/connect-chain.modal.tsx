import React, { useEffect, useState } from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import CloseIcon from '@mui/icons-material/Close'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { Chain } from 'types/chain'
import { useChainCtx } from 'contexts/chain'
import { useDefaultRpc } from 'hooks/use-default-rpc'

import { RpcList } from 'components/rpc-list/rpc-list'
import { Typography } from '@mui/material'
import { useLogger } from 'hooks/use-logger'
import { ConnectChainToast } from './connect-chain.toast'
import { Dialog } from './base-dialog/base.dialog'
import { useModal } from './modal-factory'

interface IProps {
  chain: Chain
}

enum TabValue {
  Rpc = 'Rpc',
}

const Tabs = Object.entries(TabValue) as Array<[value: string, label: string]>

export const ChangeChainModal: React.FC<IProps> = ({ chain, ...props }) => {
  const [open, setOpen] = useState(true);

  useEffect(() => {
    setOpen(true);
  }, [props])
  const [Logger, { logState }] = useLogger(ChangeChainModal.name, chain.chainId)
  const chainCtx = useChainCtx()
  const [defaultRpc] = useDefaultRpc(chain.chainId)
  const [tab, setTab] = useState(TabValue.Rpc)
  const [connectChainToast, setConnectChainToastProps] = useModal(ConnectChainToast);

  logState('defaultRpc', defaultRpc)

  console.log("🚀 ~ file: connect-chain.modal.tsx:49 ~ defaultRpc", defaultRpc)
  if (defaultRpc) {
    return <ConnectChainToast chain={chain} {...props} />
  }

  const handleConnect = () => {
    setConnectChainToastProps({ chain });
  }

  return (
    <>
      {connectChainToast}
      <Dialog
        open={open}
      >
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
                  onClick={() => setOpen(false)}
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
    </>
  )
}

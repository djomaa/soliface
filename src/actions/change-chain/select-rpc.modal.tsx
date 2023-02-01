import React from 'react'

import Tab from '@mui/material/Tab'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Button from '@mui/material/Button'
import TabContext from '@mui/lab/TabContext'
import CloseIcon from '@mui/icons-material/Close'
import Typography from '@mui/material/Typography'
import DialogTitle from '@mui/material/DialogTitle'
import DialogContent from '@mui/material/DialogContent'

import { Chain } from 'types/chain'

import { RpcList } from 'components/rpc-list'
import { Dialog } from 'modals/base/base.dialog'
import { AsyncModal } from 'libs/modals'
import { useDefaultRpc } from 'hooks/use-default-rpc'

interface IProps {
  chain: Chain;
}

enum TabValue {
  Rpc = 'Rpc',
}


export const SelectRpcModal: AsyncModal<string, IProps> = ({ chain, ...props }) => {

  const [defaultRpc] = useDefaultRpc(chain.chainId);

  const handleConnect = () => {
    console.log('CONNECT FROM RPC MODAL');
    if (!defaultRpc) {
      throw new Error(`${SelectRpcModal.name}: handleConnect: empty defaultRpc`)
    }
    props.onResolve(defaultRpc);
    props.onClose();
  }

  return (
    <>
      <Dialog
        open={true}
      >
        <DialogTitle>Connect to chain</DialogTitle>
        <DialogContent>
          <TabContext value={TabValue.Rpc}>
            <Stack direction='row' justifyContent='space-between' alignItems='center'>
              <TabList>
                <Tab
                  key={TabValue.Rpc}
                  label={TabValue.Rpc}
                  value={TabValue.Rpc}
                />
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
                  onClick={() => props.onClose()}
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

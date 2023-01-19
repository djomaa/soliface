import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AsyncModal } from 'contexts/modal';
import { useChainCtx } from 'contexts/web3';
import { safe, safeAsync } from 'helpers/safe';
import React, { useCallback, useEffect, useState } from 'react';
import { useAsync, useAsyncFn } from 'react-use';
import { Chain } from 'types/chain';
import Stepper from '@mui/material/Stepper';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import StepContent from '@mui/material/StepContent';
import { JsonBox } from 'components/json-box';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import StepButton from '@mui/material/StepButton';
import Box from '@mui/system/Box';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TabContext from '@mui/lab/TabContext';
import CloseIcon from '@mui/icons-material/Close';

import style from 'styles/dialog.module.scss';
import { useDefaultRpc } from 'hooks/use-default-rpc';
import { RpcList } from 'components/chain/components/rpc-list/rpc-list';
import { Typography } from '@mui/material';
import { useLogger } from 'hooks/use-logger';
import { useAsyncOnce } from 'hooks/use-async-once';

interface IProps {
  chain: Chain;
}

enum TabValue {
  View = 'View',
  Rpc = 'Rpc',
  Process = 'Process',
}

const Tabs = Object.entries(TabValue) as [value: string, label: string][];

export const ChangeChainModal: AsyncModal<IProps> = ({ chain, ...props }) => {
  const [Logger, { logState }] = useLogger(ChangeChainModal.name, chain.chainId);
  const chainCtx = useChainCtx();
  const [defaultRpc] = useDefaultRpc(chain.chainId);
  const [tab, setTab] = useState(defaultRpc ? TabValue.Process : TabValue.Rpc);

  logState('defaultRpc', defaultRpc);

  const [state, connect] = useAsyncOnce(async () => {
    return chainCtx.changeChain(chain)
  }, [chainCtx.addChain, chain]);



  return (
    <Dialog open={true} scroll='paper' fullWidth={true} classes={{
      scrollPaper: style.DialogContainer,
      paperScrollBody: style.DialogContainer
    }}>
      <DialogTitle>Connect to chain</DialogTitle>
      <DialogContent>
        <TabContext value={tab}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <TabList onChange={(_, tab) => {
              if (tab === TabValue.Process && !state.started) {
                connect();
              }
              setTab(tab);
            }}>
              {Tabs.map(([value, label]) => {
                return (
                  <Tab
                    key={value}
                    label={label}
                    value={value}
                    disabled={value === TabValue.Process && !defaultRpc}
                  // icon
                  />
                )
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
            <JsonBox value={chain} />
          </TabPanel>
          <TabPanel value={TabValue.Rpc}>
            <Typography variant='body2'>
              It's first time you are connecting to this chain, so you need to specify default RPC.
            </Typography>
            <Typography variant='body2'>
              You can always change it in chains section.
            </Typography>
            <RpcList {...chain} />
          </TabPanel>
          <TabPanel value={TabValue.Process}>
            {!state.started && (
              <Typography variant='body2'>
                Waiting to start
              </Typography>
            )}
            {state.loading && (
              <Stack direction='row' justifyContent='space-around'>
                <CircularProgress />
              </Stack>
            )}
            {state.error && (
              <Alert severity='error'>
                <AlertTitle>{state.error.message}</AlertTitle>
                {state.error.message}
              </Alert>
            )}
            {!state.loading && !state.error && (
              <Alert severity="info">Done</Alert>
            )}
          </TabPanel>
        </TabContext>
      </DialogContent>

    </Dialog >
  );
}



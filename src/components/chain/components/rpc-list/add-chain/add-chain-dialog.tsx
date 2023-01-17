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
import React, { useCallback, useState } from 'react';
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

interface IProps {
  chain: Chain;
}

enum TabValue {
  View = 'View',
  Result = 'Result',
}

const Tabs = Object.entries(TabValue) as [value: string, label: string][];
const Steps = ['View', 'Process'];

export const AddChainModal: AsyncModal<IProps> = (props) => {
  const chainCtx = useChainCtx();
  const [tab, setTab] = useState(TabValue.Result);

  const state = useAsync(async () => {
    return chainCtx.addChain(props.chain)
  }, [chainCtx.addChain, props.chain]);
  console.log("🚀 ~ file: add-chain-dialog.tsx:50 ~ state ~ state", state)


  return (
    <Dialog open={true} scroll='paper' fullWidth={true} classes={{
      scrollPaper: style.DialogContainer,
      paperScrollBody: style.DialogContainer
    }}>
      <DialogTitle>Add chain to wallet</DialogTitle>
      <DialogContent>
        <TabContext value={tab}>
          <Stack direction='row' justifyContent='space-between' alignItems='center'>
            <TabList onChange={(_, tab) => setTab(tab)}>
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



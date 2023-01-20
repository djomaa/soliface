import CircularProgress from '@mui/material/CircularProgress';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Dialog from '@mui/material/Dialog';
import DialogContent from '@mui/material/DialogContent';
import DialogTitle from '@mui/material/DialogTitle';
import { AsyncModal, useModalCtx } from 'contexts/modal';
import { useChainCtx } from 'contexts/web3';
import { safe, safeAsync } from 'helpers/safe';
import React, { useCallback, useEffect, useMemo, useState } from 'react';
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
import Alert, { AlertProps } from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import TabContext from '@mui/lab/TabContext';
import CloseIcon from '@mui/icons-material/Close';

import style from 'styles/dialog.module.scss';
import { useDefaultRpc } from 'hooks/use-default-rpc';
import { RpcList } from 'components/chain/components/rpc-list/rpc-list';
import { useLogger } from 'hooks/use-logger';
import { useAsyncOnce } from 'hooks/use-async-once';
import Snackbar, { SnackbarProps } from '@mui/material/Snackbar';
import { IconButton } from '@mui/material';

interface IProps {
  chain: Chain;
}

enum TabValue {
  Rpc = 'Rpc',
}

interface ContentProps extends AlertProps, Pick<SnackbarProps, 'autoHideDuration'> {
  text: string;
}

export const ConnectChainToast: AsyncModal<IProps> = ({ chain, ...props }) => {
  const [Logger, { logState }] = useLogger(ConnectChainToast.name, chain.chainId);

  const chainCtx = useChainCtx();
  const [defaultRpc] = useDefaultRpc(chain.chainId);

  logState('defaultRpc', defaultRpc);

  const state = useAsync(async () => {
    return chainCtx.changeChain(chain)
  }, [chainCtx.changeChain, chain]);

  const { text, autoHideDuration, ...alertProps } = useMemo<ContentProps>(() => {
    if (state.loading) {
      return {
        severity: 'info',
        icon: <CircularProgress color='inherit' size={20} />,
        text: 'Connecting..'
      };
    }
    const closeAction = (
      <IconButton onClick={props.handleClose} size='small' color='inherit'>
        <CloseIcon fontSize='inherit' color='inherit' />
      </IconButton>
    )
    if (state.error) {
      return {
        severity: 'error',
        action: closeAction,
        text: state.error.message,
      }
    }

    return {
      severity: 'success',
      text: 'Connected',
      autoHideDuration: 2e3,
    }
  }, [state.error, state.loading]);

  return (
    <Snackbar
      open={true}
      onClose={props.handleClose}
      message="Note archived"
      autoHideDuration={autoHideDuration}
    >
      <Alert
        {...alertProps}
        variant='filled'
      >
        {text}
      </Alert>
    </Snackbar>
  );
}



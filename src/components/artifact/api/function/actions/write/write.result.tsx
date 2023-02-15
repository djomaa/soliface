import React from 'react';
import assert from 'assert';
import { useAsync } from 'react-use';

import Stack from '@mui/material/Stack';
import Alert from '@mui/material/Alert';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { useWeb3 } from 'contexts/chain'
import { useLogger } from 'hooks/use-logger';
import { JsonBox } from 'components/json-box';
import { ExceptionAlert } from 'utils/error/alert';
import { safeObj, safeObjAsync } from 'helpers/safe';
import { usePromiEvent } from 'hooks/use-promi-event';
import { AbiItem, TransactionConfig } from 'types/abi';
import { FullWidthAlert } from 'components/full-width-alert';

import { Collapser } from '../../collapser';


interface IProps {
  abi: AbiItem;
  args: any[];
  txConf: TransactionConfig;
}
export const WriteResult: React.FC<IProps> = ({ abi, txConf, args }) => {
  const [Logger, { logState }] = useLogger(WriteResult);

  const { web3 } = useWeb3();
  const [txState, setTx] = usePromiEvent();

  const state = useAsync(async () => {
    const logger = Logger.sub('async');
    logger.debug('Started', { abi, txConf, args });

    assert(web3);
    const data = safeObj(() => web3.eth.abi.encodeFunctionCall(abi, args));
    if (data.error) {
      logger.warn('Failed to encode function call', data.error);
      throw new Error('Failed to encode function call', { cause: data.error });
    }
    txConf.data = data.result;
    logger.debug('ABI encoded', data.result);

    const gas = await safeObjAsync(async () => {
      return {
        limit: txConf.gas ?? await web3.eth.estimateGas(txConf),
        price: txConf.gasPrice ?? await web3.eth.getGasPrice(),
      }
    });
    if (gas.error) {
      logger.warn('Failed to encode function call', data.error);
      throw new Error(
        'Failed to estimate gas (or gas price)',
        { cause: gas.error }
      );
    }
    txConf.gas = gas.result.limit;
    txConf.gasPrice = gas.result.price;
    logger.debug('Gas estimated', gas.result);


    logger.debug('Final txConf', txConf)
    const promiEvent = web3.eth.sendTransaction(txConf);
    setTx(promiEvent);
  }, [abi, txConf, args]);

  logState('txState', txState)


  if (state.loading === true) {
    return (
      <Alert severity='info' icon={<CircularProgress size={20} />}>
        <AlertTitle>Preparing..</AlertTitle>
      </Alert>
    )
  }
  assert(txState);

  if (state.error) {
    return <ExceptionAlert error={state.error} />
  }
  return (
    <FullWidthAlert
      severity='info'
      variant='outlined'
      icon={txState.ready ? false : <CircularProgress size={20} />}
    >
      <AlertTitle>{!txState.ready && 'Transaction is in progress'}</AlertTitle>
      <Stack>
        {txState.txHash && <Typography>Transaction Hash: {txState.txHash}</Typography>}
        {txState.confirmations && <Typography>Confirmations: {txState.confirmations}</Typography>}
        {txState.receipt && (
          <Collapser text='Receipt'>
            <JsonBox value={txState.receipt} />
          </Collapser>
        )}
        {txState.error && (
          <Collapser text='Error' buttonProps={{
            variant: 'outlined',
            color: 'error',
          }}>
            <TextField
              multiline
              fullWidth
              color='error'
              variant='outlined'
              maxRows={20}
              value={txState.error.stack}
            />
          </Collapser>
        )}
      </Stack>
    </FullWidthAlert>
  )
}

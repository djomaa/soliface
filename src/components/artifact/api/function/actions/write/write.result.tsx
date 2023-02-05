import { CircularProgress, Stack, TextField, Typography } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import assert from 'assert';
import { JsonBox } from 'components/json-box';
import { useWeb3 } from 'contexts/chain'
import { safeObj, safeObjAsync } from 'helpers/safe';
import { useLogger } from 'hooks/use-logger';
import { usePromiEvent } from 'hooks/use-promi-event';
import React from 'react';
import { useAsync } from 'react-use';
import { AbiItem, TransactionConfig, TransactionReceipt } from 'types/abi';
import { ExceptionAlert } from 'utils/error/alert';
import { Collapser } from '../../collapser';
import style from './call-result.module.scss';
// import { TransactionConfig } from 'web3-core';
// import { AbiItem } from 'web3-utils';


interface IProps {
  abi: AbiItem;
  args: any[];
  txConf: TransactionConfig;
}
export const WriteResult: React.FC<IProps> = ({ abi, txConf, args }) => {
  const [Logger, { logState }] = useLogger(WriteResult);

  const { web3 } = useWeb3();
  const [txState, setTx] = usePromiEvent();

  const [confirmations, setConfirmations] = React.useState(0);
  const [receipt, setReceipt] = React.useState<TransactionReceipt>();

  const state = useAsync(async () => {
    const logger = Logger.sub('async');
    logger.debug('Started', { abi, txConf, args });

    assert(web3);
    const data = safeObj(() => web3.eth.abi.encodeFunctionCall(abi, args));
    if (data.error) {
      logger.warn('Failed to encode function call', data.error);
      throw new Error('Failed to encode function call', { cause: data.error });
      // throw data.error;
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



    logger.debug('Fina txConf', txConf)
    const promiEvent = web3.eth.sendTransaction(txConf);
    setTx(promiEvent);
    // const promiEvent = await safeObjAsync(() => web3.eth.sendTransaction(txConf));
    // if (promiEvent.error) {
    //   logger.warn('Failed to send transaction', promiEvent.error);
    //   throw new Error('Failed to send transaction', { cause: promiEvent.error });
    // }

    logger.debug('Result', promiEvent);
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

  // if (state.error || txState.error) {
  //   return <ExceptionAlert error={state.error} />
  // }
  if (state.error) {
    return <ExceptionAlert error={state.error} />
  }

  // if (!txState.txHash) {
  //   return (
  //     <Alert severity='info' icon={<CircularProgress size={20} />}>
  //       <AlertTitle>Status: {txState.status}</AlertTitle>
  //     </Alert>
  //   )
  // }

  console.log('txState.error', txState.error)
  // typecheck can handle two fields criteria? (state.value undefinable)
  return (
    <Alert
      severity='info'
      variant='outlined'
      icon={txState.ready ? false : <CircularProgress size={20} />}
      classes={{
        message: style.Message,
      }}
    >
      <AlertTitle>{!txState.ready && 'Transaction is in progress'}</AlertTitle>
      <Stack>
        {/* <Stack direction='row' spacing={1}> */}
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
    </Alert >
  )
}

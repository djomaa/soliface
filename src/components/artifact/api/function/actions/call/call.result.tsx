import React from 'react';
import assert from 'assert';
import { useAsync } from 'react-use';

import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';
import CircularProgress from '@mui/material/CircularProgress';

import { safeObj } from 'helpers/safe';
import { useWeb3 } from 'contexts/chain'
import { ExceptionAlert } from 'utils/error/alert';
import { AbiItem, TransactionConfig } from 'types/abi';

import style from './call-result.module.scss';
import { SucceedCallContentResult } from './succeed-call';


interface IProps {
  abi: AbiItem;
  args: any[];
  txConf: TransactionConfig;
}
export const CallResult: React.FC<IProps> = (props) => {
  const { web3 } = useWeb3();
  const state = useAsync(async () => {
    assert(web3);
    const data = safeObj(() => web3.eth.abi.encodeFunctionCall(props.abi, props.args));
    if (data.error) {
      throw new Error('Failed to encode function call', { cause: data.error });
    }
    const finalTxConf = {
      ...props.txConf,
      data: data.result,
    }
    const result = await web3.eth.call(finalTxConf);
    return result;
  }, [props]);

  if (state.loading === true) {
    return (
      <Alert severity='info' icon={<CircularProgress size={20} />}>
        <AlertTitle>Calling..</AlertTitle>

      </Alert>
    )
  }

  if (state.error) {
    return <ExceptionAlert error={state.error} />
  }

  // typecheck can handle two fields criteria? (state.value undefinable)
  return (
    <Alert
      severity='success'
      variant='outlined'
      classes={{
        message: style.Message,
      }}
    >
      <AlertTitle></AlertTitle>
      <SucceedCallContentResult result={state.value!} abi={props.abi} web3={web3!} />
    </Alert>
  )
}

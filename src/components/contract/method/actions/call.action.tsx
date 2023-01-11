import React, { useMemo, useEffect } from 'react';

import Tooltip from '@mui/material/Tooltip';
import LoadingButton from '@mui/lab/LoadingButton';

import { ZERO_ADDRESS } from 'constants/chain';
import { useContractCtx } from 'contexts/contract';
import { useAsyncAction } from 'hooks/use-async-action';
import { useWeb3, useWeb3SafeAbiCoder } from 'contexts/web3';

import { useMethodCtx } from '../context';
import { IMethodActionConf } from '../types';
import { CallResult } from '../result/call/call.result';

export const CallAction: React.FC = () => {
  const { abi, form, setResult } = useMethodCtx();
  const contractCtx = useContractCtx();
  const web3 = useWeb3();
  const safeAbiCoder = useWeb3SafeAbiCoder();

  const [action, perform] = useAsyncAction(async (res: IMethodActionConf) => {
    const { params, tx } = res;
    const data = safeAbiCoder.encodeFunctionCall(abi, params);
    const est = await web3.eth.estimateGas({
      from: ZERO_ADDRESS,
      to: contractCtx.address,
      data,
      ...tx,
    });
    console.log('Gas limit !!!', est)
    const result = await web3.eth.call({
      from: ZERO_ADDRESS,
      to: contractCtx.address,
      data,
      ...tx,
    });
    return result;
  }, [web3, abi]);

  useEffect(() => {
    if (!action) {
      return;
    }
    setResult(<CallResult action={action} />);
  }, [action])

  const disabledReason = useMemo(() => {
    if (!contractCtx.address) {
      return 'Address not set';
    }
    if (!web3) {
      return 'Web3 not connected';
    }
  }, [contractCtx.address, web3]);

  const callButton = (
    <LoadingButton
      type="submit"
      onClick={form.handleSubmit(perform)}
      variant='outlined'
      loading={action?.loading}
      disabled={!!disabledReason}
    >
      Call
    </LoadingButton>
  );

  if (!disabledReason) {
    return callButton;
  }

  return (
    <Tooltip title={disabledReason}>
      <span>
        {callButton}
      </span>
    </Tooltip>
  )

}

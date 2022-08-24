import { LoadingButton } from '@mui/lab';
import { Tooltip } from '@mui/material';
import { ZERO_ADDRESS } from 'constants/chain';
import { useContractCtx } from 'contexts/contract';
import { useWeb3, useWeb3SafeAbiCoder } from 'contexts/web3';
import { useAsyncAction } from 'hooks/use-async-action';
import React, { useMemo, useCallback, useEffect } from 'react';
import { AbiItem } from 'types/abi';
import { useMethodCtx } from '../context';
import { CallResult } from '../result/call/call.result';
import { IMethodActionConf } from '../types';

export const CallAction: React.FC = () => {
  const { abi, form, setResult } = useMethodCtx();
  const contractCtx = useContractCtx();
  const web3 = useWeb3();
  const safeAbiCoder = useWeb3SafeAbiCoder();

  const [action, perform] = useAsyncAction(async (res: IMethodActionConf) => {
    const { params, tx } = res;
    const data = safeAbiCoder.encodeFunctionCall(abi, params);
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
    setResult(<CallResult action={action}/>);
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

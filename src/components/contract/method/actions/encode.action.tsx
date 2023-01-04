import { LoadingButton } from '@mui/lab';
import { Tooltip } from '@mui/material';
import { ZERO_ADDRESS } from 'constants/chain';
import { useContractCtx } from 'contexts/contract';
import { useWeb3, useWeb3SafeAbiCoder } from 'contexts/web3';
import { useAsyncAction } from 'hooks/use-async-action';
import React, { useMemo, useCallback, useEffect } from 'react';
import { AbiItem } from 'types/abi';
import { useMethodCtx } from '../context';
import { EncodeResult } from '../result/encode';
import { IMethodActionConf } from '../types';

export const EncodeAction: React.FC = () => {
  const { abi, form, setResult } = useMethodCtx();
  const contractCtx = useContractCtx();
  const web3 = useWeb3();
  const safeAbiCoder = useWeb3SafeAbiCoder();

  const [action, perform] = useAsyncAction(async (res: IMethodActionConf) => {
    const { params, tx } = res;
    console.log('params', params);
    const data = safeAbiCoder.encodeFunctionCall(abi, params);
    return data;
  }, [web3, abi]);

  useEffect(() => {
    if (!action) {
      return;
    }
    setResult(<EncodeResult action={action} />);
  }, [action])

  const disabledReason = useMemo(() => {
    return;
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
      Encode
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

import React from 'react'
import assert from 'assert';
import { toast } from 'react-toastify';
import { useAsyncFn } from 'react-use';

import Chip from '@mui/material/Chip';
import Tooltip from '@mui/material/Tooltip';
import CircularProgress from '@mui/material/CircularProgress';

import { useWeb3 } from 'contexts/chain'
import { safeAsync } from 'helpers/safe';
import { useLogger } from 'hooks/use-logger';
import { useIsMounted } from 'hooks/use-is-mounted';

import { useFunctionCtx } from '../../../ctx';
import { PrimitiveInput } from 'components/abi-inputs/primitive';

export const GasPriceInput: React.FC = () => {
  const [Logger] = useLogger(GasPriceInput);

  const { txConfForm } = useFunctionCtx();

  const { web3 } = useWeb3();
  const { isMounted } = useIsMounted();

  const [{ loading }, fetch] = useAsyncFn(async () => {
    const logger = Logger.sub('fetch');
    logger.debug('Started');
    assert(web3);
    const [error, gasPrice] = await safeAsync(() => web3.eth.getGasPrice());
    logger.debug('Fetched', { gasPrice, error })
    if (!isMounted) {
      logger.debug('Not mounted');
      return;
    }
    if (error) {
      logger.error('Failed', error);
      toast.error('Failed to fetch gasPrice');
      return;
    }
    txConfForm.setValue('gasPrice', gasPrice);
  }, [web3]);

  const chip = React.useMemo(() => {
    const chip = (
      <Chip
        key='fetch-gas-price-chip'
        label="fetch"
        icon={loading ? <CircularProgress size={20} /> : undefined}
        disabled={!web3}
        onClick={() => fetch()}
      />
    )
    if (!web3) {
      return (
        <Tooltip
          key='disabled-fetch-gas-price-chip'
          title="Not connected to network"
        >
          <span>
            {chip}
          </span>
        </Tooltip>
      )
    }
    return chip;
  }, [web3, loading]);

  return (
    <PrimitiveInput
      labels={['gasPrice']}
      path={['gasPrice']}
      type='uint256'
      startAdornments={[chip]}
    />
  )
}

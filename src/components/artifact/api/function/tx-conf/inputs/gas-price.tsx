import { Tooltip } from '@mui/material';
import Chip from '@mui/material/Chip';
import assert from 'assert';
import { useWeb3 } from 'contexts/chain'
import { safeAsync } from 'helpers/safe';
import { useIsMounted } from 'hooks/use-is-mounted';
import { useLogger } from 'hooks/use-logger';
import React from 'react'
import { toast } from 'react-toastify';
import { MethodInput } from '../../inputs/base'

export const GasPriceInput: React.FC = () => {
  const [Logger] = useLogger(GasPriceInput);

  const { web3 } = useWeb3();
  const { isMounted } = useIsMounted();

  const fetchGasPrice = React.useCallback(async () => {
    assert(web3);
    const [error, gasPrice] = await safeAsync(() => web3.eth.getGasPrice());
    if (!isMounted) {
      return;
    }
    if (error) {
      Logger.error('Failed', error);
      toast.error('Failed to fetch gasPrice');
      return;
    }

  }, [web3]);

  const chip = React.useMemo(() => {
    const chip = (
      <Chip
        label="Fetch"
        disabled={!web3}
        onClick={() => fetchGasPrice()}
      />
    )
    if (!web3) {
      return (
        <Tooltip
          title="Not connected to network"
        >
          <span>
            {chip}
          </span>
        </Tooltip>
      )
    }
    return chip;
  }, [web3, fetchGasPrice]);

  return (
    <MethodInput
      position={['gasPrice']}
      path={['gasPrice']}
      type='uint256'
      startAdornment={chip}
    />
  )
}

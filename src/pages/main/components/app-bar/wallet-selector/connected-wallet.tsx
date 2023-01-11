import React, { useState } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';

import { cutAddress } from 'utils/address';
import SvgIcon from '@mui/material/SvgIcon';
import { useChainCtx } from 'contexts/web3';
import { IWallet } from 'hooks/use-wallet-list';

interface IProps {
  wallet: IWallet;
  account: string;
}
export const ConnectedWallet: React.FC<IProps> = ({ wallet, account }) => {
  return (
    <Stack direction='row'>
      <SvgIcon
        inheritViewBox
        component={wallet.icon}
      />
      <Typography>
        {cutAddress(account)}
      </Typography>

    </Stack>
  );
}

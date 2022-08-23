import React from 'react';
import { createSvgIcon, SvgIcon } from '@mui/material';
import { useState } from 'react';
import { InjectedConnector } from 'web3-react/dist/connectors'
import MetaMaskSvg, { ReactComponent as MMCopm} from 'media/metamask.svg';

// const MetaMaskIcon = createSvgIcon(<MetaMaskSvg />, 'MetaMask');
// const MetaMaskIcon = <SvgIcon component={MMCopm} inheritViewBox />
const MetaMaskIcon = MMCopm

export interface IWallet {
  icon: any;
  name: string;
  connector: any;
}


const Wallet: IWallet[] = [
  {
    name: 'MetaMask',
    connector: new InjectedConnector(),
    icon: MetaMaskIcon,
  }
]

export const useWalletList = () => {
  const [wallets, setWallet] = useState(Wallet);
  return { wallets };
}

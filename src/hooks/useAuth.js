import { useCallback, createContext, useContext, useEffect, useRef } from 'react';
import { useWeb3React } from '@web3-react/core';
//import { useHistory } from 'react-router-dom';

import { injected, walletConnect } from '../constants/connectors';
import { PATH_INDEX } from '../constants/routes.constants';
import { CURRENT_CHAIN_ID } from '../constants/global.constants';

export const AuthContext = createContext({});

export const useAuthMethod = () => useContext(AuthContext);

export const useAuth = () => {
  const { activate, deactivate, account, chainId } = useWeb3React();
  const mounted = useRef(false);
  //const history = useHistory();

  useEffect(() => {
    if (!mounted.current) mounted.current = true;
    else if (!account) {
      localStorage.removeItem('auth');
      //history.push(PATH_INDEX);
    }
    //if (chainId && !CURRENT_CHAIN_ID.includes(chainId)) history.push(PATH_INDEX);
  }, [account, history, chainId]);

  const connectMetaMask = useCallback(async () => {
    try {
      await activate(injected);
      localStorage.setItem('auth', 'MetaMask');
    } catch (e) {
      console.log(e);
      localStorage.removeItem('auth');
    }

  }, [activate]);

  const connectWalletConnect = useCallback(async () => {
    try {
     await activate(walletConnect);
      localStorage.setItem('auth', 'WalletConnect');
    } catch (e) {
      console.log(e);
      localStorage.removeItem('auth');
    }

  }, [activate]);

  const logOut = useCallback(() => {
    deactivate();
    localStorage.removeItem('auth');
    localStorage.removeItem('walletconnect');
  }, [deactivate]);

  useEffect(() => {
    (async () => {
      if (localStorage.getItem('auth') === 'MetaMask') {
        await connectMetaMask();
      }
      if (localStorage.getItem('auth') === 'WalletConnect') {
        await connectWalletConnect();
      }
    })();
  }, [connectMetaMask, connectWalletConnect]);

  return { connectMetaMask, connectWalletConnect, logOut };
};

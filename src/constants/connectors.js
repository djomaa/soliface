import { InjectedConnector } from '@web3-react/injected-connector';
import { WalletConnectConnector } from '@web3-react/walletconnect-connector';

const POLLING_INTERVAL = 12000;

const RPC_URL_56 = 'https://bsc-dataseed1.binance.org';

export const injected = new InjectedConnector({ });

export const walletConnect = new WalletConnectConnector({
  rpc: { 56: RPC_URL_56 },
  bridge: 'https://bridge.walletconnect.org',
  qrcode: true,
  pollingInterval: POLLING_INTERVAL,
});

import { Chain } from 'types/chain';

const List = [
  {
    "name": "Ethereum Mainnet",
    "chain": "ETH",
    "icon": "ethereum",
    "rpc": [
      "https://mainnet.infura.io/v3/0118f9b6e8dc4ba48f01e4e44453cfa8",
      "https://cloudflare-eth.com",
      "https://api.mycryptoapi.com/eth",
    ],
    "faucets": [
      
    ],
    "nativeCurrency": {
      "name": "Ether",
      "symbol": "ETH",
      "decimals": 18
    },
    "infoURL": "https://ethereum.org",
    "shortName": "eth",
    "chainId": 1,
    "networkId": 1,
    "slip44": 60,
    "ens": {
      "registry": "0x00000000000C2E074eC69A0dFb2997BA6C7d2e1e"
    },
    "explorers": [
      {
        "name": "etherscan",
        "url": "https://etherscan.io",
        "standard": "EIP3091"
      }
    ]
  },
  {
    "name": "Görli",
    "title": "Ethereum Testnet Görli",
    "chain": "ETH",
    "network": "testnet",
    "rpc": [
      "https://rpc.goerli.mudit.blog/"
    ],
    "faucets": [
      "http://fauceth.komputing.org?chain=5&address=${ADDRESS}",
      "https://goerli-faucet.slock.it?address=${ADDRESS}",
      "https://faucet.goerli.mudit.blog"
    ],
    "nativeCurrency": {
      "name": "Görli Ether",
      "symbol": "GOR",
      "decimals": 18
    },
    "infoURL": "https://goerli.net/#about",
    "shortName": "gor",
    "chainId": 5,
    "networkId": 5,
    "ens": {
      "registry": "0x112234455c3a32fd11230c42e7bccd4a84e02010"
    },
    "explorers": [
      {
        "name": "etherscan-goerli",
        "url": "https://goerli.etherscan.io",
        "standard": "EIP3091"
      }
    ]
  },
];

export const ChainList = List as Chain[];

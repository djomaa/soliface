import React, { useState, useMemo } from 'react';
import { Button, ListItem, ListItemButton, Menu, MenuItem, TextField } from '@mui/material';
import { useChainCtx } from 'contexts/web3';
import { useChainList } from 'hooks/use-chain-list';
import { Chain } from 'types/chain';
import { useWeb3React } from '@web3-react/core';
import { useAuthMethod } from '../../hooks/useAuth';

function search(chains: Chain[], value: string) {
  if (!value) {
    return chains;
  }
  const searchRegexp = new RegExp(value, 'i');
  const numberSearch = Number(value);
  const isNumberSearch = Number.isNaN(numberSearch) === false;
  const isHexSearch = value.startsWith('0x')
  const hexSearch = isHexSearch ? Number(value) : null;
  return chains.filter((chain) => {
    if (chain.name.search(searchRegexp) !== -1) {
      return true;
    }
    if (chain.shortName.search(value) !== -1) {
      return true
    }
    if (isNumberSearch && chain.chainId === numberSearch) {
      return true
    }
    if (isHexSearch && chain.chainId === hexSearch) {
        return true
    }
    return false;
  });
}

export const ChainSelector: React.FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const { chainId } = useWeb3React();
  const { connectMetaMask } = useAuthMethod() as any;
  console.log(chainId)

  const { chainList } = useChainList();
  const ctx = useChainCtx();

  const network = chainList.find((n) => n.chainId === ctx.networkId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const changeChain = (chainId: number) => {
    setAnchorEl(null);
    const chain = chainList.find((c) => c.chainId === chainId);
    if (!chain) {
      throw new Error('Unexpected error: cannot find chain by chainId');
    }
    ctx.setConnector(chain.rpc[0]);
  };

  const filtered = useMemo(() => {
    return search(chainList, searchValue);
  }, [searchValue])

  const options = filtered.map((chain) => {
    return (
      <MenuItem
        key={chain.chainId}
        selected={chain.chainId === ctx.networkId}
        onClick={() => changeChain(chain.chainId)}
      >
       {chain.name}
      </MenuItem>
    )
  })

  return (
    <div>
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {chainId ? `Connect ${chainId}`: 'Not connected'}
       {/* {network?.name ?? "Not connected"}*/}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        autoFocus={false}
      >
        <MenuItem onClick={connectMetaMask}>
         MetaMask
        </MenuItem>
        {options}
      </Menu>
    </div>
  );

}

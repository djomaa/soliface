import React, { useState, useMemo } from 'react';

import Menu from '@mui/material/Menu';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';

import { Chain } from 'types/chain';
import { useChainCtx } from 'contexts/web3';
import { useChainList } from 'hooks/use-chain-list';

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

  const { chainList } = useChainList();
  const ctx = useChainCtx();
  const isWallet = !!ctx.wallet;

  const network = chainList.find((n) => n.chainId === ctx.chainId);

  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const changeChain = (chainId: number) => {
    setAnchorEl(null);
    const chain = chainList.find((c) => c.chainId === chainId);
    if (!chain) {
      throw new Error('Unexpected error: cannot find chain by chainId');
    }
    ctx.changeChain(chain);
  };

  const filtered = useMemo(() => {
    return search(chainList, searchValue);
  }, [searchValue])

  const options = filtered.map((chain) => {
    return (
      <MenuItem
        key={chain.chainId}
        selected={chain.chainId === ctx.chainId}
        onClick={() => changeChain(chain.chainId)}
      >
        {chain.name}
      </MenuItem>
    )
  })

  if (isWallet) {
    return (
      <>
        <Tooltip title='Chain is controlled by wallet'>
          <span>
            <Button>
              {network?.name ?? 'Not connected'}
            </Button>
          </span>
        </Tooltip>
      </>
    );
  }

  return (
    <div>
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}
      >
        {network?.name ?? "Not connected"}
      </Button>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        autoFocus={false}
      >
        {/* <MenuItem> */}
        {/* <TextField
            value={searchValue}
            onChange={(e) => {
              return setSearchValue(e.target.value);
            }}
          ></TextField> */}
        {/* </MenuItem> */}
        {options}
      </Menu>
    </div>
  );

}

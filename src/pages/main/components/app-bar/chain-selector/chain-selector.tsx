import React, { useMemo, useState } from 'react'

import Box from '@mui/system/Box'
import List from '@mui/material/List'
import { ListItem } from '@mui/material'
import Button from '@mui/material/Button'
import Tooltip from '@mui/material/Tooltip'
import Popover from '@mui/material/Popover'
import TextField from '@mui/material/TextField'
import ListItemButton from '@mui/material/ListItemButton'

import { Chain } from 'types/chain'
import { useFocus } from 'hooks/use-focus'
import { useSearch } from 'hooks/use-search'
import { Status, useChainCtx } from 'contexts/chain'
import { useChangeChainAction } from 'actions/change-chain'
import { searchChain, useChainList } from 'hooks/use-chain-list'

export const ChainSelector: React.FC = () => {
  const chainCtx = useChainCtx()

  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null)

  const { chainList } = useChainList()
  const [searchRef, focusSearch] = useFocus();
  const { changeChain: connectChain } = useChangeChainAction();
  const [search, setSearch, searchList] = useSearch(chainList, searchChain)


  const chain = useMemo(() => {
    return chainList.find((n) => n.chainId === chainCtx.chainId);
  }, [chainCtx.chainId, chainList]);

  const changeChain = (chain: Chain) => {
    setAnchorEl(null);
    connectChain(chain);
  }

  const options = useMemo(() => {
    return searchList.map((chain) => {
      return (
        <ListItemButton
          key={chain.chainId}
          onClick={() => changeChain(chain)}
        >
          {chain.name}
        </ListItemButton>
      )
    })
  }, [searchList])

  if (chainCtx.status === Status.Connected && !chainCtx.canSwitchChain) {
    return (
      <>
        <Tooltip title='Chain cannot be switched'>
          <Button>
            {chain?.name ?? 'Not connected'}
          </Button>
        </Tooltip>
      </>
    )
  }

  return (
    <Box>
      {/* {selectedChain && <ConnectChainModal open={true} onClose={() => setSelectedChain(undefined)} chain={selectedChain} />} */}
      <Button
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget)
          focusSearch(10)
        }}
      >
        {chain?.name ?? 'Not connected'}
      </Button>
      <Popover
        open={!(anchorEl == null)}
        keepMounted
        anchorEl={anchorEl}
        onClose={() => { setAnchorEl(null) }}
        sx={{ maxHeight: '95vh' }}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left'
        }}
      >
        <List>
          <ListItem>
            <TextField
              inputRef={searchRef}
              fullWidth
              focused={true}
              value={search}
              onChange={(e) => { setSearch(e.target.value) }}
              size='small'
            />
          </ListItem>
          {options}
          {(options.length === 0) && (
            <ListItem>
              No chains found :c
            </ListItem>
          )}
        </List>
      </Popover>
    </Box>
  )
}

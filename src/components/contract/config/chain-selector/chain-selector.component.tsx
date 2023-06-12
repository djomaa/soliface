import React, { useMemo } from 'react'

import TextField from '@mui/material/TextField'
import InputAdornment from '@mui/material/InputAdornment'
import Autocomplete, { createFilterOptions } from '@mui/material/Autocomplete'

import { Chain } from 'types/chain'
import { useChainCtx } from 'contexts/chain'
import { useChainList } from 'hooks/use-chain-list'
import { useChangeChainAction } from 'actions/change-chain'

import { State } from './chain-selector.state'

const filterOptions = createFilterOptions<Chain>({
  stringify: (chain) => `${chain.chainId} ${chain.chainId.toString(16)} ${chain.name}`,
});

export const ChainSelector: React.FC = () => {
  const chainCtx = useChainCtx()

  const { chainList } = useChainList()
  const { changeChain: connectChain } = useChangeChainAction();
  const chain = useMemo(() => {
    return chainList.find((n) => n.chainId === chainCtx.chainId);
  }, [chainCtx.chainId, chainList]);

  console.log("🚀 ~ file: chain-selector.component.tsx:35 ~ chain:", chain)


  return (
    <Autocomplete
      autoComplete
      options={chainList}
      filterOptions={filterOptions}
      disabled={!chainCtx.canSwitchChain}
      getOptionLabel={(chain) => chain.name}
      value={chain ?? null}
      onChange={(_, chain) => {
        if (chain) {
          connectChain(chain);
        }
      }}
      renderInput={(params) => (
        <TextField
          {...params}
          label='Chain'
          margin='dense'
          helperText={chainCtx.canSwitchChain ? undefined : 'Chain cannot be switched'}
          // inputProps={{
          //   ...params.inputProps,
          //   value: !params.inputProps.value && chain ? chain.name : params.inputProps.value,
          // }}
          InputProps={{
            ...params.InputProps,
            autoComplete: 'new-password',
            startAdornment: (
              <InputAdornment position="start">
                <State />
              </InputAdornment>
            )
          }}
        />
      )}
    />
  )
}
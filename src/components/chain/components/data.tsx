import React from 'react'

import Link from '@mui/material/Link'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import Grid from '@mui/material/Unstable_Grid2/Grid2'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { DepcrecatedChainType } from 'types/chain'
import { numberToHex } from 'utils/number.utils'

function NameMeNormalLink(url?: string) {
  if (!url) {
    return {
      disabled: true,
      InputProps: {
        endAdornment: <OpenInNewIcon />
      }
    }
  }
  return {
    disabled: false,
    InputProps: {
      endAdornment: (
        <IconButton
          LinkComponent={Link}
          href={url}
          target='_blank'
        >
          <OpenInNewIcon />
        </IconButton>
      )
    }
  }
}

export const DataElement: React.FC<DepcrecatedChainType> = (chain: DepcrecatedChainType) => {
  return (
    <Grid container spacing={1} alignItems='baseline'>
      <Grid xs={12}>
        <TextField
          fullWidth
          label='Name'
          variant='outlined'
          value={chain.name}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label='Chain ID (decimal)'
          variant='outlined'
          value={chain.chainId}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label='Chain ID (hex)'
          variant='outlined'
          value={numberToHex(chain.chainId)}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label='Network ID'
          variant='outlined'
          value={chain.networkId}
        />
      </Grid>
      <Grid xs={12} md={6}>
        <TextField
          fullWidth
          label='Slip44'
          variant='outlined'
          value={chain.slip44 ?? 'empty'}
          disabled={chain.slip44 === undefined}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <TextField
          fullWidth
          label='Currency symbol'
          variant='outlined'
          value={chain.nativeCurrency.symbol}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <TextField
          fullWidth
          label='Currency decimals'
          variant='outlined'
          value={chain.nativeCurrency.decimals}
        />
      </Grid>
      <Grid xs={12} md={4}>
        <TextField
          fullWidth
          label='Currency name'
          variant='outlined'
          value={chain.nativeCurrency.name}
        />
      </Grid>
      <Grid xs={12} md={12}>
        <TextField
          fullWidth
          label='Website'
          variant='outlined'
          value={chain.infoURL ?? 'empty'}
          {...NameMeNormalLink(chain.infoURL)}
        />
      </Grid>
      <Grid xs={12} md={12}>
        <TextField
          fullWidth
          label='ENS Registry'
          variant='outlined'
          value={chain.ens?.registry ?? 'empty'}
          disabled={chain.ens === undefined}
        />
      </Grid>
    </Grid>
  )
}

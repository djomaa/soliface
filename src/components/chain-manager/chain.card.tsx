import React, { useMemo } from 'react'
import { Link } from 'react-router-dom'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import MuiLink from '@mui/material/Link'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import Grid from '@mui/system/Unstable_Grid'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { Chain } from 'types/chain'
import { createRoute, Route } from 'constants/route'
import { getWebsiteFavicon } from 'utils/google'

const CustomAvatar: React.FC<Chain> = (chain) => {
  const url = useMemo(() => getWebsiteFavicon(chain.infoURL), [chain]);
  return (
    <Avatar
      src={url}
    >
      ?
    </Avatar>
  )
}

export const ChainCard: React.FC<Chain> = (chain: Chain) => {
  return (
    <Card>
      <CardHeader
        title={chain.name}
        subheader={<MuiLink href={chain.infoURL} target='_blank' >{chain.infoURL}</MuiLink>}
        avatar={<CustomAvatar {...chain} />}
      />
      <CardContent>
        <Grid
          container
          rowSpacing={2}
        >
          <Grid xs={6}>
            <Stack alignItems='center'>
              <Typography color="text.secondary">
                Chain ID:
              </Typography>
              <Typography color="text.primary">
                {chain.chainId}
              </Typography>
            </Stack>
          </Grid>
          <Grid xs={6}>
            <Tooltip title={`Decimals: ${chain.nativeCurrency.decimals} | Name: ${chain.nativeCurrency.name}`}>
              <Stack alignItems='center'>
                <Typography color="text.secondary">
                  Currency:
                </Typography>
                <Typography color="text.primary">
                  {chain.nativeCurrency.symbol}
                </Typography>
              </Stack>
            </Tooltip>
          </Grid>
        </Grid>
        {/* <Stack direction='row' justifyContent='space-evenly'>
          <Stack alignItems='center'>
            <Typography color="text.secondary">
              Chain ID:
            </Typography>
            <Typography color="text.primary">
              {chain.chainId}
            </Typography>
          </Stack>
          <Tooltip title={`Decimals: ${chain.nativeCurrency.decimals} | Name: ${chain.nativeCurrency.name}`}>
            <Stack alignItems='center'>
              <Typography color="text.secondary">
                Currency:
              </Typography>
              <Typography color="text.primary">
                {chain.nativeCurrency.symbol}
              </Typography>
            </Stack>
          </Tooltip>
        </Stack> */}
      </CardContent >
      <CardActions sx={{ width: '100%' }}>
        <Button
          fullWidth
          size='small'
          component={Link}
          to={createRoute[Route.Chain](chain.chainId)}
        >
          More
        </Button>
      </CardActions>
    </Card >
  )
}

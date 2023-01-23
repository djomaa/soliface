import React from 'react'

import Card from '@mui/material/Card'
import Stack from '@mui/material/Stack'
import Button from '@mui/material/Button'
import Avatar from '@mui/material/Avatar'
import Tooltip from '@mui/material/Tooltip'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import CardContent from '@mui/material/CardContent'
import CardActions from '@mui/material/CardActions'

import { Chain } from 'types/chain'
import { Link } from 'react-router-dom'
import { createRoute, Route } from 'constants/route'

export const ChainCard: React.FC<Chain> = (chain: Chain) => {
  const url = chain.icon ? `https://icons.llamao.fi/icons/chains/rsz_${chain.icon}.jpg` : '/unknown-logo.png'
  return (
    <Card>
      <CardHeader
        title={chain.name}
        subheader={chain.shortName}
        avatar={
          <Avatar src={url} />
        }
      />
      <CardContent>
        <Stack direction='row' justifyContent='space-evenly'>
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
        </Stack>
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

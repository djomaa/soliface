import Stack from '@mui/material/Stack'
import Card from '@mui/material/Card'
import CardContent from '@mui/material/CardContent'
import CardHeader from '@mui/material/CardHeader'
import Typography from '@mui/material/Typography'
import React, { useState } from 'react'
import { Chain } from 'types/chain'
import Tooltip from '@mui/material/Tooltip'
import CardActions from '@mui/material/CardActions'
import IconButton from '@mui/material/IconButton'
import ExpandMoreIcon from '@mui/icons-material/ExpandMore'
import Button from '@mui/material/Button'
import ExpandLessIcon from '@mui/icons-material/ExpandLess'
import Collapse from '@mui/material/Collapse'
import Box from '@mui/material/Box'

export const ChainCard: React.FC<Chain> = (chain: Chain) => {
  const [expanded, setExpanded] = useState(false);
  return (
    <Card>
      <CardHeader
        title={chain.name}
        subheader={chain.shortName}
      />
      <CardContent>
        <Stack direction='row' justifyContent='space-between'>
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
        <Stack
          direction='row'
          justifyContent='space-between'
          alignItems='center'
          width='100%'
        >
          <Box>
            <Button size='small'>RPC</Button>
            <Button size='small'>JSON</Button>
          </Box>
          <IconButton
            onClick={() => setExpanded(!expanded)}
          >
            {expanded ? <ExpandLessIcon /> : <ExpandMoreIcon />}
          </IconButton>
        </Stack>
      </CardActions>
      <Collapse in={expanded} timeout="auto" unmountOnExit>
        <CardContent>
          asd
        </CardContent>
      </Collapse>
    </Card >
  )
}

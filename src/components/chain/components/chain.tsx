import React, { useState } from 'react'

import Box from '@mui/material/Box'
import Tab from '@mui/material/Tab'
import Link from '@mui/material/Link'
import TabList from '@mui/lab/TabList'
import Stack from '@mui/material/Stack'
import TabPanel from '@mui/lab/TabPanel'
import Avatar from '@mui/material/Avatar'
import TabContext from '@mui/lab/TabContext'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import OpenInNewIcon from '@mui/icons-material/OpenInNew'

import { DepcrecatedChainType } from 'types/chain'
import { JsonBox } from 'components/json-box'

import { DataElement } from './data'
import { FaucetsElement } from './faucets'
import { RpcList } from '../../rpc-list/rpc-list'

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

enum TabValue {
  Data = 'data',
  JSONData = 'json_data',
  RPCs = 'rpcs',
  Faucets = 'faucets',
}

const TabLabel: Record<TabValue, string> = {
  [TabValue.Data]: 'Data',
  [TabValue.JSONData]: 'JSON Data',
  [TabValue.RPCs]: 'RPCs',
  [TabValue.Faucets]: 'Faucets'
}

const Tabs = Object.entries(TabLabel) as Array<[value: string, label: string]>

export const Data: React.FC<DepcrecatedChainType> = (chain: DepcrecatedChainType) => {
  const [tab, setTab] = useState<TabValue>(TabValue.Data)

  const icon = React.useMemo(() => {
    return chain.icon ? `https://icons.llamao.fi/icons/chains/rsz_${chain.icon}.jpg` : '/unknown-logo.png'
  }, [chain])

  return (
    <Box>
      <Stack direction='row' justifyContent='space-around'>
        <Avatar src={icon} />
      </Stack>
      <Typography
        component="h1"
        variant="h2"
        align="center"
        color="text.primary"
        gutterBottom
      >
        {chain.title ?? chain.name}
      </Typography>
      <Box>
        <TabContext value={tab}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={(_, tab) => { setTab(tab) }} aria-label="lab API tabs example">
              {Tabs.map(([value, label]) => {
                return <Tab key={value} label={label} value={value} />
              })}
            </TabList>
          </Box>
          <TabPanel value={TabValue.Data}>
            <DataElement {...chain} />
          </TabPanel>
          <TabPanel value={TabValue.JSONData}>
            <JsonBox value={chain} />
          </TabPanel>
          <TabPanel value={TabValue.RPCs}>
            <RpcList {...chain} />
          </TabPanel>
          <TabPanel value={TabValue.Faucets}>
            <FaucetsElement {...chain} />
          </TabPanel>
        </TabContext>
      </Box>
    </Box >
  )
}

import React, { useMemo, useState } from 'react';
import Typography from '@mui/material/Typography'
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import TextField from '@mui/material/TextField';
import CardHeader from '@mui/material/CardHeader';

import { Chain } from 'types/chain';
import { useChainList } from 'hooks/use-chain-list';
import { ChainCard } from '../chain-card';
import Avatar from '@mui/material/Avatar';
import Stack from '@mui/material/Stack';
// import Grid from '@mui/material/Grid';
import Grid from '@mui/material/Unstable_Grid2/Grid2';
import OpenInNewIcon from '@mui/icons-material/OpenInNew';
import { numberToHex } from 'utils/number.utils';
import IconButton from '@mui/material/IconButton';
import Link from '@mui/material/Link';
import InputAdornment from '@mui/material/InputAdornment';
import { withStyles } from '@mui/material/styles';
import { styled } from '@mui/system';
import Button from '@mui/material/Button';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import { DataElement } from './data';
import { RpcList } from './rpc-list/rpc-list';
import { FaucetsElement } from './faucets';
import { JsonBox } from 'components/json-box';

function NameMeNormalLink(url?: string) {
  if (!url) {
    return {
      disabled: true,
      InputProps: {
        endAdornment: <OpenInNewIcon />,
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
  [TabValue.Faucets]: 'Faucets',
}

const Tabs = Object.entries(TabLabel) as [value: string, label: string][];


export const Data: React.FC<Chain> = (chain: Chain) => {
  const [tab, setTab] = useState<TabValue>(TabValue.Data);

  const icon = React.useMemo(() => {
    return chain.icon ? `https://icons.llamao.fi/icons/chains/rsz_${chain.icon}.jpg` : "/unknown-logo.png";
  }, [chain]);


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
            <TabList onChange={(_, tab) => setTab(tab)} aria-label="lab API tabs example">
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
  );
}

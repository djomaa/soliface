import React, { useState } from 'react';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import MenuIcon from '@mui/icons-material/Menu';

import { useLogger } from 'hooks/use-logger';

import { NavMap } from './types';
import { NavListItems } from './list-items';
import { useAbiInputsCtx } from '../ctx';
import { UseStateObject } from 'types/react';
import Stack from '@mui/material/Stack';
import IconButton from '@mui/material/IconButton';


export const OpenNavigation: React.FC = (props) => {
  const [Logger] = useLogger(OpenNavigation);
  const ctx = useAbiInputsCtx();

  const map = React.useMemo(() => {
    const logger = Logger.sub('build')
    logger.debug('Building', ctx.map)
    const root: NavMap = {};
    for (const [key, value] of ctx.map.entries()) {
      const sLogger = logger.sub(key);
      const parts = key.split('.');
      parts.reduce((item, part, i) => {
        const isLast = i === parts.length - 1;
        if (isLast) {
          sLogger.debug("Set to", item[part])
          item[part] = { id: key, ref: value } as any;
          // acc[part] = { root: 123 };
          return item;
        }
        if (!item[part]) {
          item[part] = { childrenMap: {} } as any;
        } else if (!item[part].childrenMap) {
          item[part].childrenMap = {};
        }
        return item[part].childrenMap!;
      }, root);
    }

    return root;
  }, [ctx.map]);

  return (
    <Box
      sx={{
        overflowY: 'scroll',
        flexGrow: 1,
      }}
    >
      <List
        // dense
        disablePadding
      >
        <NavListItems map={map} />
      </List>
    </Box>
  )
}

interface ClosedNavigationProps extends UseStateObject<'open', boolean> {

}
export const ClosedNavigation: React.FC<ClosedNavigationProps> = (props) => {
  return (
    <Box></Box>
    // <List
    // >
    //   <ListItem key='open' disablePadding>
    //     <ListItemButton
    //       onClick={(prev) => props.setOpen(!!prev)}
    //     >
    //       <ListItemIcon>
    //         <MenuIcon />
    //       </ListItemIcon>
    //     </ListItemButton>
    //   </ListItem>
    // </List>
  )
}

export const NavigationMenu: React.FC<ClosedNavigationProps> = (props) => {
  return (
    <Stack
      direction='row'
    >
      <IconButton
        onClick={() => {
          return props.setOpen((prev) => {
            console.log('ooopen', { prev })
            return !prev;
          });
        }}
      >
        <MenuIcon />
      </IconButton>
    </Stack>
  )
}

export const Navigation: React.FC = (props) => {
  const ctx = useAbiInputsCtx();
  const [open, setOpen] = useState(false);

  return (
    <Box
      ref={(node) => ctx.setNavContainer(node as any as HTMLElement)}
      style={{
        width: open ? '30%' : '5%',
        transition: 'all .1s linear',
        // height: '100%',
        display: 'flex',
        flexDirection: 'column',
        flexGrow: 1,
      }}
    >
      <NavigationMenu open={open} setOpen={setOpen} />
      {open && <OpenNavigation />}
    </Box>
  )
}

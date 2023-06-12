import React, { DOMAttributes } from 'react'

import Box from '@mui/material/Box'
import List from '@mui/material/List'
import ListItem from '@mui/material/ListItem'
import ListItemButton from '@mui/material/ListItemButton'
import ListItemIcon from '@mui/material/ListItemIcon'

import ArticleIcon from '@mui/icons-material/Article';
import FindInPageIcon from '@mui/icons-material/FindInPage';
import HardwareIcon from '@mui/icons-material/Hardware';
import ListItemText from '@mui/material/ListItemText'
import DoubleArrowLeft from '@mui/icons-material/KeyboardDoubleArrowLeft';
import DoubleArrowRight from '@mui/icons-material/KeyboardDoubleArrowRight';
import { UseStateObject } from 'types/react'

interface Item {
  text: string;
  icon: React.ReactElement;
  onClick?: DOMAttributes<any>['onClick'];
}
const items: Item[] = [
  {
    text: 'Contract',
    icon: <HardwareIcon />,
  },
  {
    text: 'Artifacts',
    icon: <ArticleIcon />,
  }, {
    text: 'Chains',
    icon: <FindInPageIcon />,
  },
]

interface IProps extends UseStateObject<'open', boolean> {
  text: boolean;
  expandable: boolean;
}
export const SiteNavigation: React.FC<IProps> = ({ text, open, setOpen, ...props }) => {

  // const width = useMemo(() => {
  //   return props.open ? '100%' : '20%';
  // }, [open]);

  const genItem = (item: Item) => {
    return (
      <ListItem key={item.text} disablePadding>
        <ListItemButton
          onClick={item.onClick}
        >
          {item.icon && (
            <ListItemIcon>
              {item.icon}
            </ListItemIcon>
          )}
          {/* {text && ( */}
          <ListItemText sx={{ margin: 0 }} primary={text ? item.text : ' '} />
          {/* )} */}
        </ListItemButton>
      </ListItem>
    )
  }

  return (
    <Box
      width='100%'
      height='100%'
    // flexGrow={1}
    >
      <Box
        // width={width}
        // position='fixed'
        display='flex'
        flexDirection='column'
        justifyContent='space-between'
        height='100%'
      >
        <Box>
          <List>
            {items.map((item) => genItem(item))}
          </List>
        </Box>
        {props.expandable && (
          <Box>
            <List>
              {genItem({
                text: open ? 'Collapse' : 'Expand',
                icon: open ? <DoubleArrowLeft /> : < DoubleArrowRight />,
                onClick: () => {
                  setOpen(p => !p);
                }
              })}
            </List>
          </Box>
        )}
      </Box>
    </Box>
  )
}

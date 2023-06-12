import React, { AllHTMLAttributes } from 'react';

import Box from '@mui/material/Box';

import MenuList from '@mui/material/MenuList';
import ArticleIcon from '@mui/icons-material/Article';
import HardwareIcon from '@mui/icons-material/Hardware';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import { SideNavItem, SideNavItemProps } from './side-nav-item';

const items: SideNavItemProps[] = [
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

interface SideNavProps {
  minWidth: AllHTMLAttributes<unknown>['width'];
  maxWidth: AllHTMLAttributes<unknown>['width'];
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  const [hover, setHover] = React.useState(false);

  return (
    <Box
      height='100%'
      display='flex'
      flexDirection='column'
      justifyContent='space-between'
      width={hover ? props.maxWidth : props.minWidth}
      onMouseOver={() => setHover(true)}
      onMouseOut={() => setHover(false)}
    >
      <MenuList>
        {items.map((item) => <SideNavItem
          text={hover ? item.text : undefined}
          icon={item.icon}
          onClick={item.onClick}
        />)}
      </MenuList >
    </Box>
  )
}

import React, { AllHTMLAttributes } from 'react';
import { useNavigate } from 'react-router-dom';

import Box from '@mui/material/Box';
import MenuList from '@mui/material/MenuList';
import ArticleIcon from '@mui/icons-material/Article';
import HardwareIcon from '@mui/icons-material/Hardware';
import FindInPageIcon from '@mui/icons-material/FindInPage';

import { Route, RouteLabel } from 'constants/route';

import { SideNavItem, SideNavItemProps } from './side-nav-item';

const RouteIcons = [
  [Route.Home, <HardwareIcon />] as const,
  [Route.ArtifactManager, <ArticleIcon />] as const,
  [Route.ChainManager, <FindInPageIcon />] as const,
];

interface SideNavProps {
  minWidth: AllHTMLAttributes<unknown>['width'];
  maxWidth: AllHTMLAttributes<unknown>['width'];
}

export const SideNav: React.FC<SideNavProps> = (props) => {
  const navigate = useNavigate();

  const [hover, setHover] = React.useState(false);

  const items: SideNavItemProps[] = React.useMemo(() => {
    return RouteIcons.map(([route, icon]) => {
      return {
        text: RouteLabel[route],
        icon,
        onClick: () => navigate(route),
      }
    });
  }, [navigate]);

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

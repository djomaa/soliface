import React from 'react';
import { Link } from 'react-router-dom';

import Box from '@mui/material/Box';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';

import MenuIcon from '@mui/icons-material/Menu';
import IconButton from '@mui/material/IconButton';

import { Routes } from 'constants/route';

const routes = Routes.map(([route, label]) => {
  return (
    <MenuItem key={route}
      component={Link}
      to={route}
    >
      {label}
    </MenuItem>
  )
});

export const PageSelector: React.FC = () => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  return (
    <Box>
      <IconButton
        onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
          setAnchorEl(event.currentTarget);
        }}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        open={open}
        onClose={() => setAnchorEl(null)}
        autoFocus={false}
      >
        {routes}
      </Menu>
    </Box>
  );

}

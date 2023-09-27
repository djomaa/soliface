import React, { DOMAttributes } from 'react';

import MenuItem from '@mui/material/MenuItem';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';

export interface SideNavItemProps {
  text: string | undefined;
  icon: React.ReactElement;
  onClick?: DOMAttributes<any>['onClick'];
}

export const SideNavItem: React.FC<SideNavItemProps> = ({ text, onClick, icon }) => {
  return (
    <MenuItem
      key={text}
      onClick={onClick}
    >
      {icon && (
        <ListItemIcon>
          {icon}
        </ListItemIcon>
      )}
      {text && <ListItemText sx={{ margin: 0 }} primary={text} />}
    </MenuItem>
  )
}

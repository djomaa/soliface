import React from 'react';
import ListItemText from '@mui/material/ListItemText';

import { NavMapItem } from './types';
import { NavSubList } from './sub-list';
import { NavPrimitiveItem } from './list-primitive-item';

interface IProps {
  field: string;
  padding?: number;
  item: NavMapItem;
}
export const NavItem: React.FC<IProps> = ({
  field,
  padding = 0,
  item,
}) => {
  if (item.childrenMap) {
    return (
      <NavSubList field={field} item={item} padding={padding} />
    )
  }
  return (
    <NavPrimitiveItem
      title={field}
      item={item}
      padding={`calc(${padding}rem + 0.5em)`}
    >
      <ListItemText primary={field} />
    </NavPrimitiveItem>
  );

}

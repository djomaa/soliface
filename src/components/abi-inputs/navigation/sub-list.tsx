import { useToggle } from 'react-use';

import List from '@mui/material/List';
import Collapse from '@mui/material/Collapse';
import ListItemText from '@mui/material/ListItemText';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import React from 'react';
import { NavMapParentItem } from './types';
import { NavListItems } from './list-items';
import { NavPrimitiveItem } from './list-primitive-item';

interface IProps {
  field: string;
  padding: number;
  item: NavMapParentItem;
}
export const NavSubList: React.FC<IProps> = ({
  field,
  padding,
  item,
}) => {
  const [open, toggleOpen] = useToggle(true);

  const Icon = open ? ArrowDownIcon : ArrowRightIcon;

  return (
    <List
      key={`${field}-children`}
      disablePadding
      subheader={(
        <NavPrimitiveItem
          title={field}
          item={item}
          padding={`calc(${padding}rem)`}
        >
          <Icon
            fontSize='inherit'
            onClick={toggleOpen}
          />
          <ListItemText primary={field} />
        </NavPrimitiveItem>
      )}
    >
      <Collapse in={open}>
        <NavListItems map={item.childrenMap} padding={padding + 1} />
      </Collapse>
    </List>
  )
}

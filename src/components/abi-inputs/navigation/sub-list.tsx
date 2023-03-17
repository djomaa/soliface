import { useToggle } from 'react-use';

import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { NavMapParentItem } from './types';
import List from '@mui/material/List';
import { NavPrimitiveItem } from './list-primitive-item';
import React from 'react';
import ListItemText from '@mui/material/ListItemText';
import Collapse from '@mui/material/Collapse';
import { NavListItems } from './list-items';

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

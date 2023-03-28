import React from 'react';

import ListItemButton from '@mui/material/ListItemButton';

import { NavMapItem } from './types';

interface IProps extends React.PropsWithChildren {
  title: string;
  item: NavMapItem;
  padding: string;
}
export const NavPrimitiveItem: React.FC<IProps> = ({
  title, padding, children, item: { id, ref },
}) => {
  const itemRef = React.useRef<HTMLDivElement>(null);

  return (
    <ListItemButton
      ref={itemRef}
      key={title}
      style={{
        padding: 0,
        paddingLeft: padding,
      }}
      onClick={() => {
        ref.label.current?.scrollIntoView({ block: 'nearest', behavior: 'auto' });
        if (ref.input) {
          ref.input.current!.focus();
        }
      }}
    >
      {children}
    </ListItemButton>
  );
}

import ListItemButton from '@mui/material/ListItemButton';
import React from 'react';
import { useAbiInputsCtx } from '../ctx';
import { NavMapItem } from './types';

interface IProps extends React.PropsWithChildren {
  title: string;
  item: NavMapItem;
  padding: string;
}
export const NavPrimitiveItem: React.FC<IProps> = ({
  title, padding, children, item: { id, ref },
}) => {
  const { active, navContainer, inputsContainer } = useAbiInputsCtx();

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
        console.log('click', ref);
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

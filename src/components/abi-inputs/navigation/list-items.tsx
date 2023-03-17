import React from 'react';
import { NavItem } from './list-item';
import { NavMap } from './types';

interface IProps {
  map: NavMap;
  padding?: number;
}

export const NavListItems: React.FC<IProps> = ({ map, padding = 0.5 }: IProps) => {
  const items = Object.entries(map)
    .map(([key, value]) => <NavItem field={key} item={value} padding={padding} />);
  return (
    <>
      {items}
    </>
  )
}

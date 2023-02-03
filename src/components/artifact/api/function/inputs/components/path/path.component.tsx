import React from 'react';
import { StringifyAble } from 'types/common';

import style from './path.module.scss'

interface IProps {
  path: StringifyAble[];
}

export const Path: React.FC<IProps> = ({ path }) => {
  const [open, setOpen] = React.useState(false)

  const text = React.useMemo(() => {
    if (path.length === 1) {
      return '/ ' + path[0].toString();
    }
    if (open) {
      return '/ ' + path.join(' / ');
    }
    return '... / ' + path[path.length - 1];
  }, [open, path])

  const className = React.useMemo(() => {
    const classes: string[] = [style.PathLabel];
    if (path.length > 1) {
      classes.push(style.Clickable)
    }
    return classes.join(' ');
  }, [path]);
  return (
    <>
      <span
        className={className}
        onClick={(e) => {
          setOpen(p => !p)
          e.preventDefault();
        }}
      >
        {text}
      </span>
      &nbsp;
    </>
  )
}

import React from 'react';
import { StringifyAble } from 'types/common';

import style from './path.module.scss'

interface IProps {
  parts: StringifyAble[];
}

export const Path: React.FC<IProps> = ({ parts }) => {
  const [open, setOpen] = React.useState(true)

  const text = React.useMemo(() => {
    if (parts.length === 1) {
      return '/ ' + parts[0].toString();
    }
    if (open) {
      return '/ ' + parts.join(' / ');
    }
    return '... / ' + parts[parts.length - 1];
  }, [open, parts])

  const className = React.useMemo(() => {
    const classes: string[] = [style.PathLabel];
    if (parts.length > 1) {
      classes.push(style.Clickable)
    }
    return classes.join(' ');
  }, [parts]);
  return (
    <>
      <span
        className={className}
        onClick={(e) => {
          setOpen(p => !p)
          e.preventDefault();
          e.stopPropagation();
        }}
      >
        {text}
      </span>
      &nbsp;
    </>
  )
}

import React, { useState, useMemo } from 'react';
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft';
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import { OverrideProps } from '@mui/material/OverridableComponent';
import { Breadcrumbs, BreadcrumbsTypeMap, IconButton, Stack, Typography, TypographyTypeMap } from '@mui/material';

import styles from 'styles/common.module.scss'

interface IPathBreadcrumpProps {
  path: (string | number)[];
  breadcrumb?: OverrideProps<BreadcrumbsTypeMap, any>;
  typography?: TypographyTypeMap['props'];
}

export const PathBreadcrump: React.FC<IPathBreadcrumpProps> = ({ path, breadcrumb, typography }) => {
  const [open, setOpen] = useState(false);

  const more = useMemo(() => {
    if (path.length === 1) {
      return;
    }
    return open
      ? <IconButton size='small' onClick={() => setOpen((prev) => !prev)}><ArrowLeftIcon fontSize='small' /></IconButton>
      : <IconButton size='small' onClick={() => setOpen((prev) => !prev)}><ArrowRightIcon fontSize='small' /></IconButton>;
  }, [open]);

  const items = useMemo(() => {
    if (open) {
      return path.map((item, i) => {
        return <Typography {...typography}>{item}</Typography>;
      })
    }
    const part = <Typography {...typography}>{path[path.length - 1]}</Typography>;
    return path.length === 1 ? [part] : [<div />, part]
  }, [open]);

  return (
    <Stack
      direction='row'
      alignItems='center'
    // className={styles.ArrayInputHeader}
    >
      <Breadcrumbs>
        {items}
      </Breadcrumbs >
      {more}
    </Stack >
  );
}

function preparePath(path: (string | number)[]) {
  return path.reduce((acc, item, i) => {
    const isFirst = i === 0;
    if (typeof item === 'string') {
      if (!isFirst) {
        acc += '.';
      }
      acc += item
    } else {
      acc += `[${item}]`
    }
    return acc;
  }, '')
}

import React, { useState, useMemo } from 'react'

import Stack from '@mui/material/Stack'
import IconButton from '@mui/material/IconButton'
import ArrowLeftIcon from '@mui/icons-material/ArrowLeft'
import ArrowRightIcon from '@mui/icons-material/ArrowRight'
import { OverrideProps } from '@mui/material/OverridableComponent'
import Typography, { TypographyTypeMap } from '@mui/material/Typography'
import Breadcrumbs, { BreadcrumbsTypeMap } from '@mui/material/Breadcrumbs'

interface IPathBreadcrumpProps {
  path: Array<string | number>
  breadcrumb?: OverrideProps<BreadcrumbsTypeMap, any>
  typography?: TypographyTypeMap['props']
}

export const PathBreadcrump: React.FC<IPathBreadcrumpProps> = ({ path, typography }) => {
  const [open, setOpen] = useState(false)

  const more = useMemo(() => {
    if (path.length === 1) {
      return
    }
    return open
      ? <IconButton size='small' onClick={() => { setOpen((prev) => !prev) }}><ArrowLeftIcon fontSize='small' /></IconButton>
      : <IconButton size='small' onClick={() => { setOpen((prev) => !prev) }}><ArrowRightIcon fontSize='small' /></IconButton>
  }, [open])

  const items = useMemo(() => {
    if (open) {
      return path.map((item, i) => {
        return <Typography {...typography}>{item}</Typography>
      })
    }
    const part = <Typography {...typography}>{path[path.length - 1]}</Typography>
    return path.length === 1 ? [part] : [<div />, part]
  }, [open])

  return (
    <Stack
      direction='row'
      alignItems='center'
    >
      <Breadcrumbs>
        {items}
      </Breadcrumbs >
      {more}
    </Stack >
  )
}

function preparePath(path: Array<string | number>) {
  return path.reduce((acc, item, i) => {
    const isFirst = i === 0
    if (typeof item === 'string') {
      if (!isFirst) {
        acc += '.'
      }
      acc += item
    } else {
      acc += `[${item}]`
    }
    return acc
  }, '')
}

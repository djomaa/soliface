import React from 'react'
import { TextFieldElement } from 'react-hook-form-mui'

import Box from '@mui/material/Box'
import InputAdornment from '@mui/material/InputAdornment'


import { InputPath, InputPosition } from '../input.component'
import { StringifyAble } from 'types/common'
import { Path } from '../components/path'
import Paper from '@mui/material/Paper'

const joinPath = (path: StringifyAble[], open: boolean) => {
  if (path.length === 1) {
    return path[0].toString();
  }
  if (open) {
    return path.join(' / ');
  }
  return '... / ' + path[path.length - 1];
}

interface IProps {
  type: string;
  position: InputPosition[]
  path: InputPath[]
}
export const MethodInput: React.FC<IProps> = ({ type, position, path }) => {
  const fullPosition = position.join('.')
  const [open, setOpen] = React.useState(false)

  const label = React.useMemo(() => {
    return (
      <Paper
        elevation={0}
      >
        <Path path={path} />
      </Paper>
    )
  }, [path, open])

  return (
    <Box pt={1}>
      {/* <Box className={style.MethodInputHeader}>
        <PathBreadcrump path={path} />
      </Box> */}
      <TextFieldElement
        name={fullPosition}
        fullWidth
        variant='outlined'
        label={label}
        margin='dense'
        InputLabelProps={{
          shrink: true,
        }}
        InputProps={{
          // startAdornment: <InputAdornment position="start" >{position.join(',')}</InputAdornment>,
          // startAdornment: <InputAdornment position="start" >nbsp;</InputAdornment>,
          endAdornment: <InputAdornment position="end">{type}</InputAdornment>,
        }}
      />
    </Box >
  )
}

import React from 'react';

import Box from '@mui/material/Box';
import Divider from '@mui/material/Divider';
import Collapse from '@mui/material/Collapse';
import Button, { ButtonProps } from '@mui/material/Button';
import ArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import ArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';

import { Child } from 'components/child';
import { UseStateObject } from 'types/react';

type ICustomProps<T> = T & UseStateObject<'open', boolean>;

interface IProps extends Partial<UseStateObject<'open', boolean>> {
  disabled?: boolean;
  text: string;
  buttonProps?: ButtonProps;
}
export const Collapser: React.FC<React.PropsWithChildren<IProps | ICustomProps<IProps>>> = (props) => {
  const [localOpen, localSetOpen] = React.useState(props.open ?? false);

  const open = props.open === undefined ? localOpen : props.open;
  const setOpen = props.setOpen === undefined ? localSetOpen : props.setOpen;

  return (
    <Child
      bottom={open}
    >
      <Button
        disabled={props.disabled}
        fullWidth
        sx={{
          paddingLeft: '16px',
          justifyContent: 'flex-start',
          borderRadius: '0px',
        }}
        variant='text'
        {...props.buttonProps}
        startIcon={open ? <ArrowDownIcon /> : <ArrowRightIcon />}
        onClick={() => {
          return setOpen(v => !v)
        }}>
        {props.text}
      </Button>
      <Collapse in={open} unmountOnExit={true}>
        <Box>
          {props.children}
          <Child top >
            <Divider />
          </Child>
        </Box>
      </Collapse>
    </Child >
  )
}

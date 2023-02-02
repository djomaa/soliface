import Box, { BoxProps } from '@mui/material/Box';
import React from 'react';

// type IPropsX = { x: boolean, left: undefined, right: undefined } | { x: undefined, left: boolean | undefined; right: boolean | undefined };
// type IPropsY = { y: boolean, top: undefined, bottom: undefined } | { y: undefined, top: boolean | undefined; bottom: boolean | undefined };
type IPropsX = { x: boolean } | { left?: boolean; right?: boolean };
type IPropsY = { y: boolean } | { top?: boolean; bottom?: boolean };

type IProps = IPropsX & IPropsY;

export const Child: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const boxProps: BoxProps = {};
  if ('x' in props) {
    if (props.x) {
      boxProps.marginLeft = '16px'
      boxProps.marginRight = '16px'
    }
  } else {
    if (props.left) {
      boxProps.marginLeft = '16px'
    }
    if (props.right) {
      boxProps.marginLeft = '16px'
    }
  }
  if ('y' in props) {
    if (props.y) {
      boxProps.marginTop = '12px'
      boxProps.marginBottom = '12px'
    }
  } else {
    if (props.top) {
      boxProps.marginTop = '12px'
    }
    if (props.bottom) {
      boxProps.marginBottom = '12px'
    }
  }
  return (
    <Box
      {...boxProps}
    >
      {props.children}
    </Box>
  )
}

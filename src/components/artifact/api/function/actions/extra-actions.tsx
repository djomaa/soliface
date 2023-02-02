import { Button, Box, Slide, ButtonGroup, IconButton } from '@mui/material'
import React, { useRef } from 'react'
import ArrowRightIcon from '@mui/icons-material/ArrowRight';
import CloseIcon from '@mui/icons-material/Close';
import { useToggle } from 'react-use';
import { useEncodeAbiAction } from './encode-abi';
import { Handler } from './handler';

export const ExtraActions = () => {
  const ref = useRef();
  const [open, toggleOpen] = useToggle(false)

  const { encodeAbiHandler } = useEncodeAbiAction();

  return (
    <Box display='flex' flexDirection='row'>
      <IconButton
        size='small'
        color='secondary'
        onClick={toggleOpen}
      >
        {open ? <CloseIcon /> : <ArrowRightIcon />}
      </IconButton>
      <Box ref={ref}
        sx={{
          overflow: 'hidden',
        }}
      >
        <Slide in={open} direction='right' container={ref.current}
        >
          <ButtonGroup variant='outlined' color='secondary'>
            <Handler {...encodeAbiHandler} />
            <Button
            // onClick={handleEncodeAbi}
            >
              Estimate gas
            </Button>
          </ButtonGroup>
        </Slide>
      </Box>

    </Box>

  )
}

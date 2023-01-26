import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import { useCookies } from 'hooks/use-cookies';
import React, { useState } from 'react';
import { CustomCookies } from './custom-cookies';



export const Cookies: React.FC = () => {
  // called to create instance in storage if user will not press customize
  const cookies = useCookies();
  const [open, setOpen] = useState(true);
  const [expanded, setExpanded] = useState(false);

  const acceptAll = () => {
    cookies.setDefaultConfig();
    cookies.accept();
    setOpen(false);
  }

  const accept = () => {
    setOpen(false);
  };

  return (
    <Dialog
      open={open}
    >
      <DialogTitle>Your privacy</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Hey! This website collects some data about you to improve perfomance and for some statistics
        </DialogContentText>
        {expanded && <CustomCookies />}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => expanded ? acceptAll() : setExpanded(true)}>{expanded ? 'Accept all' : 'Customize'}</Button>
        <Button onClick={accept}>Accept</Button>
      </DialogActions>
    </Dialog >
  )

}

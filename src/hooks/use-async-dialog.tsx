import React from 'react';
import { useAsync } from 'react-use'

import { AsyncDialogProps } from "react-dialog-async";
import { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import Button from '@mui/material/Button';

export const InputDialog: React.FC = () => {
  return (
    <Dialog open={true}>
      <DialogTitle>Aaaa</DialogTitle>
      data
      <Button autoFocus>
        Close
      </Button>
    </Dialog >
  );
}


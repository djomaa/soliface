import React from 'react'
import { useToggle } from 'react-use'

import Collapse from '@mui/material/Collapse'
import IconButton from '@mui/material/IconButton'
import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'

import { JsonBox } from 'components/json-box'
import { TransactionReceipt } from 'types/abi'

export const ReceiptViewer: React.FC<{ receipt: TransactionReceipt }> = ({ receipt }) => {
  const [open, toggleOpen] = useToggle(false);

  return (
    <>
      <IconButton onClick={toggleOpen}>
        <KeyboardArrowDown />
      </IconButton>
      <Collapse in={open}>
        <JsonBox value={receipt} />
      </Collapse>
    </>
  )
}

import KeyboardArrowDown from '@mui/icons-material/KeyboardArrowDown'
import { Collapse, IconButton } from '@mui/material'
import { JsonBox } from 'components/json-box'
import React from 'react'
import { useToggle } from 'react-use'
import { TransactionReceipt } from 'web3-core'

export const ReceiptViewer: React.FC<{ receipt: TransactionReceipt }> = ({ receipt }) => {
  const [open, toggleOpen] = useToggle(false);

  console.log(receipt)

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

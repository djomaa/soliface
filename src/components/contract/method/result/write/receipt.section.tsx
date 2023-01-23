import { useToggle } from 'react-use'
import React, { useMemo } from 'react'
import { TransactionReceipt } from 'web3-core'

import Dialog from '@mui/material/Dialog'
import TextField from '@mui/material/TextField'
import DialogContent from '@mui/material/DialogContent'

import styles from 'styles/common.module.scss'

interface iProps {
  receipt: TransactionReceipt
}
export const ReceiptSection: React.FC<iProps> = ({ receipt }) => {
  const [open, toggleOpen] = useToggle(false)

  const strValue = useMemo(() => {
    return JSON.stringify(receipt, null, 2)
  }, [receipt])

  return (
    <>
      <span onClick={toggleOpen} className={styles.ClickableText}>
        Click to open receipt
      </span>
      <Dialog
        open={open}
        onClose={() => { toggleOpen(false) }}
        fullWidth={true}
      >
        <DialogContent>
          <TextField
            multiline
            autoFocus
            margin="dense"
            label="ABI"
            fullWidth
            variant="outlined"
            minRows={20}
            value={strValue}
          />
        </DialogContent>
      </Dialog>
    </>
  )
}

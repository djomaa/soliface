import React from 'react'

import MuiDialog, { DialogProps } from '@mui/material/Dialog'

import { IParentProps } from 'types/react'
import style from 'styles/dialog.module.scss'

export interface IDialogProps extends Partial<Pick<DialogProps, 'open' | 'onClose'>> {
}
export const Dialog: React.FC<IDialogProps & IParentProps> = (props) => {
  return (
    <MuiDialog
      fullWidth
      scroll='paper'
      open={true}
      {...props}
      classes={{
        scrollPaper: style.DialogContainer,
        paperScrollBody: style.DialogContainer
      }}
    >
      {props.children}
    </MuiDialog>
  )

}

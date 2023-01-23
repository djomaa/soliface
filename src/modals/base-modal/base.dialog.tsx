import React from 'react'

import MuiDialog from '@mui/material/Dialog'

import { IParentProps } from 'types/react'
import style from 'styles/dialog.module.scss'

interface IProps extends IParentProps {

}
export const Dialog: React.FC<IProps> = (props) => {
  return (
    <MuiDialog
      open
      fullWidth
      scroll='paper'
      classes={{
        scrollPaper: style.DialogContainer,
        paperScrollBody: style.DialogContainer
      }}
    >
      {props.children}
    </MuiDialog>
  )

}

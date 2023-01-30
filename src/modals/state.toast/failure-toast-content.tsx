import React from 'react'

import Button from '@mui/material/Button'

import { modal } from 'libs/modals'

import { FailureModal } from './failure-modal'

export const FailureToastContent: React.FC<{ error: Error, text: string }> = ({ error, text }) => {
  const more = () => {
    modal.show(FailureModal, { error })
  }
  return (
    <>
      {text}
      <Button size='small' onClick={() => more()}>More</Button>
    </>
  )
}

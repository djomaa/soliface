import React from 'react'

import Button from '@mui/material/Button'

import { modal } from 'libs/modals'

import { FailureModal } from './failure-modal'

export const FailureToastContent: React.FC<{ error: Error }> = ({ error }) => {
  const more = () => {
    modal(FailureModal, { error })
  }
  return (
    <>
      Failed to connect wallet
      <Button size='small' onClick={() => more()}>More</Button>
    </>
  )
}

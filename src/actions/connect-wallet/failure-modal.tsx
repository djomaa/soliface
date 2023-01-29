import React from 'react'

import { Modal } from 'libs/modals'
import { ErrorModal } from 'modals/base-modal'

export const FailureModal: Modal<{ error: Error }> = ({ error, ...props }) => {
  return (
    <ErrorModal
      title='Failed to connect wallet'
      error={error}
      dialogProps={{
        open: true,
        onClose: props.onClose
      }}
    />
  )
}

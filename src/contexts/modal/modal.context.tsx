import React, { createContext, useContext } from 'react'

import Box from '@mui/material/Box'

import { useLogger } from 'hooks/use-logger'
import { useList } from 'react-use'

export interface IAsyncModalBaseProps {
  id: number
  handleClose: () => void
  // className: string;
}

type IAddModal = <T>(component: React.FC<IAsyncModalBaseProps & T>, props: T) => number

export type AsyncModal<T = {}> = React.FC<IAsyncModalBaseProps & T>

interface IState {
  addModal: IAddModal
}
export const ModalCtx = createContext<IState | null>(null)

export const useModalCtx = () => {
  const ctx = useContext(ModalCtx)
  if (ctx == null) {
    throw new Error('useModalCtx: ModalCtx is null')
  }
  return ctx
}

interface IProps {
  children: React.ReactNode | React.ReactNode[]
}
let ind = 0
let id = 1
export const ModalCtxProvider: React.FC<IProps> = ({ children }) => {
  const [logger, { logState }] = useLogger(ModalCtxProvider, ind++)
  // const [modals, setModals] = useState<Array<ReactElement<IModalBaseProps>>>([])
  const [modals, { filter, push }] = useList<React.ReactElement<IAsyncModalBaseProps>>([]);

  const closeModal = (id: number) => {
    logger.debug('Close', id)
    return filter((modal) => modal.props.id !== id);
    // setModals((modals) => {
    //   console.log('33333#', 'rm', id);
    //   return modals.filter((modal) => {
    //     console.log("🚀 ~ file: modal.context.tsx:43 ", modal, id)
    //     return modal.props.id !== id;
    //   })
    // })
  }

  const addModal: IAddModal = (Component, props) => {
    const cId = id++
    logger.debug('Add', cId)
    const element = (
      <Component
        key={cId}
        id={cId}
        handleClose={() => {
          console.log('handle close');
          closeModal(cId)
        }}
        {...props} />
    )
    // setModals((modals) => [...modals, element])
    push(element);
    logger.debug('Done')
    return cId
  }

  logState('modals', modals)
  const value = {
    addModal
  }
  return (
    <ModalCtx.Provider value={value}>
      <Box>
        {modals}
      </Box>
      {children}
    </ModalCtx.Provider>
  )
}

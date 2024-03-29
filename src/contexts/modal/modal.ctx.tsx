import { useList } from 'react-use'
import React, { createContext } from 'react'

import Box from '@mui/material/Box'

import { useLogger } from 'hooks/use-logger'

export interface IAsyncModalBaseProps {
  id: number
  handleClose: () => void
}

type IAddModal = <T>(component: React.FC<IAsyncModalBaseProps & T>, props: T) => number

export type AsyncModal<T = {}> = React.FC<IAsyncModalBaseProps & T>

export interface ModalCtxState {
  addModal: IAddModal;
  addModal1: (modal: React.ReactElement<IAsyncModalBaseProps>) => void;
  getProps: () => IAsyncModalBaseProps;
}
export const ModalCtx = createContext<ModalCtxState | null>(null)


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
  }

  const getProps = () => {
    const cId = id++;
    return {
      key: cId,
      id: cId,
      handleClose: () => closeModal(cId),
    };
  }

  const addModal1 = (modal: React.ReactElement<IAsyncModalBaseProps>) => {
    push(modal);
  }

  const addModal: IAddModal = (Component, props) => {
    const cId = id++
    logger.debug('Add', cId)
    const element = (
      <Component
        key={cId}
        id={cId}
        handleClose={() => {
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
    addModal,
    addModal1,
    getProps,
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

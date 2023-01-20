import React, { createContext, ReactElement, useContext, useEffect, useId, useMemo, useState } from 'react';
import { useSearchParams } from 'react-router-dom';

import { safe } from 'helpers/safe';
import { Artifact } from 'helpers/abi';
import { decodeB64 } from 'helpers/base64';
import { useLogger } from 'hooks/use-logger';
import { useArtifactStore } from 'hooks/use-artifact-store';
import Box from '@mui/material/Box';

export type IModalBaseProps = {
  id: number;
  handleClose: () => void;
  // className: string;
}

type IAddModal = <T>(component: React.FC<IModalBaseProps & T>, props: T) => number;

export type AsyncModal<T = {}> = React.FC<IModalBaseProps & T>;

interface IState {
  addModal: IAddModal;
}
export const ModalCtx = createContext<IState | null>(null);

export const useModalCtx = () => {
  const ctx = useContext(ModalCtx);
  if (!ctx) {
    throw new Error('useModalCtx: ModalCtx is null');
  }
  return ctx;
}

interface IProps {
  children: React.ReactNode | React.ReactNode[];
}
let ind = 0;
export const ModalCtxProvider: React.FC<IProps> = ({ children }) => {
  const [logger, { logState }] = useLogger(ModalCtxProvider, ind++);
  const [modals, setModals] = useState<ReactElement<IModalBaseProps>[]>([]);

  const closeModal = (id: number) => {
    logger.debug('Close', id);
    setModals((modals) => {
      return modals.filter((modal) => {
        modal.props.id !== id;
      })
    });
  }

  let id = 1;
  const addModal: IAddModal = (Component, props) => {
    const cId = id++;
    logger.debug('Add', cId);
    const element = (
      <Box key={cId}>
        <Component
          key={cId}
          id={cId}
          handleClose={() => closeModal(cId)}
          {...props} />
      </Box>
    );
    setModals((modals) => [...modals, element]);
    logger.debug('Done');
    return cId;
  }

  logState('modals', modals);
  const value = {
    addModal,
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

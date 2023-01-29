import Box from '@mui/material/Box';
import React, { useCallback, useEffect, useState } from 'react';

export interface IModalProps {
  id: number
  onClose: () => void
}

export type Modal<T = {}> = React.FC<IModalProps & T>
type IAddModal = <T>(component: React.FC<IModalProps & T>, props: T) => number

let _createModal: undefined | IAddModal;
export const modal: IAddModal = (...args) => {
  if (!_createModal) {
    throw new Error('ModalLib: no ModalContainer created')
  }
  return _createModal(...args);
}

let id = 0;
export const ModalContainer: React.FC = () => {

  const [list, setList] = useState<React.ReactElement<IModalProps>[]>([]);

  const close = useCallback((id: number) => {
    setList((prev) => {
      return prev.filter((m) => m.props.id !== id);
    })
  }, []);

  const add: IAddModal = useCallback(<T,>(Component: React.FC<IModalProps & T>, props: T) => {
    const cId = id++;
    const element = <Component id={cId} onClose={() => close(cId)} {...props} />;
    setList((prev) => [...prev, element]);
    return cId;
  }, []);

  useEffect(() => {
    _createModal = add;
    return () => {
      _createModal = undefined;
    }
  });

  return (
    <Box id='modal-container'>
      {list}
    </Box>
  );

}

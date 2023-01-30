import Box from '@mui/material/Box';
import { Logger as AppLogger } from 'helpers/logger';
import React, { useEffect, useState } from 'react';

const Logger = new AppLogger('@libs', 'modal');

export interface IModalProps {
  id: number
  onClose: () => void
}

type Item = React.ReactElement<IModalProps>;
let setState: React.Dispatch<React.SetStateAction<Item[]>> | undefined;
const safeGetSetState = () => {
  if (!setState) {
    throw new Error('ModalLib: no ModalContainer created')
  }
  return setState;
}

export const remove = (id: number) => {
  safeGetSetState()((prev) => {
    const result = prev.filter((m) => m.props.id !== id);
    const logger = Logger.sub(id, remove.name);
    if (result.length === prev.length) {
      logger.warn('Failed, not found!')
    } else {
      logger.debug('Succeed');
    }
    return result;
  })
}

export const add = (element: Item) => {
  safeGetSetState()((prev) => {
    Logger.sub(element.props.id, add.name).debug('Succeed', { totalModals: prev.length + 1 });
    return [...prev, element];
  });
}

export const ModalContainer: React.FC = () => {

  const [list, setList] = useState<Item[]>([]);

  useEffect(() => {
    setState = setList;
    return () => {
      setState = undefined;
    }
  }, []);

  return (
    <Box id='modal-container'>
      {list}
    </Box>
  );

}

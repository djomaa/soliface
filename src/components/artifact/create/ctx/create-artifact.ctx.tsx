import assert from 'assert';
import React, { createContext, useCallback, useState } from 'react';

import { AbiItem } from 'types/abi';
import { useLogger } from 'hooks/use-logger';
import { UseStateObject } from 'types/react';
import { useArtifactSaveAction } from 'hooks/use-artifact';

export const AddAbiStep = {
  ABI: 0,
  Details: 1,
  Done: 2,
}
export const AddAbiStepCount = Object.keys(AddAbiStep).length;

export interface AddAbiCtxState
  extends
  UseStateObject<'step', number>,
  UseStateObject<'abi', AbiItem[] | undefined>,
  UseStateObject<'name', string> {
  save: (hash: string) => void;
}

export const AddAbiCtx = createContext<AddAbiCtxState | null>(null);

interface IProps {
  name?: string;
  onClose?: () => void;
}
export const AddAbiCtxProvider: React.FC<React.PropsWithChildren<IProps>> = (props) => {
  const [Logger] = useLogger(AddAbiCtxProvider);
  const { saveArtifact } = useArtifactSaveAction();

  const [name, setName] = useState<string>(props.name ?? '');
  const [abi, setAbi] = useState<AbiItem[]>();
  const [step, setStep] = useState(AddAbiStep.ABI);

  const save = useCallback((hash: string) => {
    const logger = Logger.sub('save');
    logger.debug('Started', { hash, name, abi })
    assert(name);
    assert(abi);
    saveArtifact({
      hash,
      name,
      abi,
    });
    if (props.onClose) {
      props.onClose();
    } else {
      setStep(step + 1);
    }
  }, [name, abi])

  const value: AddAbiCtxState = {
    step,
    setStep,
    abi,
    setAbi,
    name,
    setName,
    save,
  }

  return (
    <AddAbiCtx.Provider value={value}>
      {props.children}
    </AddAbiCtx.Provider>
  )
}

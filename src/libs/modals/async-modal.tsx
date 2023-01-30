import { baseModal } from './base-modal';
import { IModalProps } from './modal-container';

interface IAsyncModalProps<T> {
  onResolve: (value: T) => void;
  onReject: (error: Error) => void;
}

export type AsyncModal<TReturn, TProps = {}> = React.FC<IModalProps & IAsyncModalProps<TReturn> & TProps>;

export const asyncModal = <TProps, TReturn,>(Component: React.FC<TProps & IModalProps & IAsyncModalProps<TReturn>>, props: TProps) => {
  return new Promise<TReturn | undefined>((resolve, reject) => {
    baseModal(Component, {
      ...props,
      onResolve: (value) => {
        resolve(value);

      },
      onReject: (value) => reject(value),
    }, (baseProps) => ({
      ...baseProps,
      onClose: () => {
        baseProps.onClose();
        resolve(undefined);
      }
    }));
  });
}

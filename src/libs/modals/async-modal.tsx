import { IModalProps, showModal } from './modal';

interface IAsyncModalProps<T> {
  onResolve: (value: T) => void;
  onReject: (error: Error) => void;
}

export type AsyncModal<TReturn, TProps = {}> = React.FC<IModalProps & IAsyncModalProps<TReturn> & TProps>;

export const asyncModal = <TProps, TReturn,>(Component: React.FC<TProps & IModalProps & IAsyncModalProps<TReturn>>, props: TProps) => {
  return new Promise<TReturn>((resolve, reject) => {
    showModal(Component, {
      ...props,
      onResolve: (value) => {
        resolve(value);

      },
      onReject: (value) => reject(value),
    })
  });
}

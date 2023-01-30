import { Logger } from 'helpers/logger';
import { safeAsync } from 'helpers/safe';
import React from 'react';
import { toast, UpdateOptions } from 'react-toastify';
import { FailureToastContent } from './failure-toast-content';

// const logger = new Logger('createStateToast');
export const createStateToast = async (
  action: () => Promise<void>,
  text: {
    loading: string,
    error: string,
    success: string,
  },
  logger: Logger,
) => {
  const toastId = toast.loading(text.loading, { type: 'info' });
  const [error] = await safeAsync<Error, () => Promise<void>>(action);
  const sharedOptions: UpdateOptions = {
    isLoading: false,
    closeButton: true,
  }
  if (error) {
    logger.error('Failure', error);
    toast.update(toastId, {
      type: 'error',
      autoClose: false,
      ...sharedOptions,
      render: <FailureToastContent text={text.error} error={error} />,
    });
    return;
  }
  toast.update(toastId, {
    type: 'success',
    autoClose: 5e3,
    ...sharedOptions,
    render: text.success,
  });
}

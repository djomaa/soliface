import React from 'react';
import { QueryClient, QueryClientProvider, setLogger } from 'react-query';

import { Logger } from 'helpers/logger';

const logger = new Logger('react-query');
setLogger({
  error: logger.warn.bind(logger, 'Failure'),
  warn: logger.warn.bind(logger),
  log: logger.debug.bind(logger),
});

export const QueryCtxProvider: React.FC<React.PropsWithChildren> = (props) => {
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      {props.children}
    </QueryClientProvider>
  )
}

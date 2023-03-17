import List from '@mui/material/List';
import { useLogger } from 'hooks/use-logger';
import React from 'react';
import { useAbiInputsCtx } from '../ctx';
import { NavListItems } from './list-items';
import { NavMap } from './types';

export const Navigation: React.FC = (props) => {
  const [Logger] = useLogger(Navigation);
  const ctx = useAbiInputsCtx();

  const map = React.useMemo(() => {
    const logger = Logger.sub('build')
    logger.debug('Building', ctx.map)
    const root: NavMap = {};
    for (const [key, value] of ctx.map.entries()) {
      const sLogger = logger.sub(key);
      const parts = key.split('.');
      parts.reduce((item, part, i) => {
        const isLast = i === parts.length - 1;
        if (isLast) {
          sLogger.debug("Set to", item[part])
          item[part] = { id: key, ref: value } as any;
          // acc[part] = { root: 123 };
          return item;
        }
        if (!item[part]) {
          item[part] = { childrenMap: {} } as any;
        } else if (!item[part].childrenMap) {
          item[part].childrenMap = {};
        }
        return item[part].childrenMap!;
      }, root);
    }

    return root;
  }, [ctx.map]);

  return (
    <List
      // dense
      disablePadding
    >
      <NavListItems map={map} />
    </List>
  )
}

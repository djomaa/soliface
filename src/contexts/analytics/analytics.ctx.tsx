import React from 'react'
import Analytics from 'analytics'
import { AnalyticsProvider } from 'use-analytics'
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics'
import { Logger } from 'helpers/logger'

function getPlugins() {
  const logger = new Logger('analytics');
  if (process.env.NODE_ENV !== 'production') {
    logger.warn('Not production env, so disabled');
    return [];
  }
  const plugins = [
    googleAnalytics({
      measurementIds: ['G-CGEH9LZ6FH']
    })
  ];
  logger.debug('Enabled', { plugins: plugins.length });
  return plugins;
}

const analytics = Analytics({
  app: 'soliface',
  plugins: getPlugins(),
})

interface iProps {
  children: React.ReactNode | React.ReactNode[]
}

export const AnalyticsCtxProvider: React.FC<iProps> = (props) => {
  return (
    <AnalyticsProvider instance={analytics}>
      {props.children}
    </AnalyticsProvider>
  )
}

import React from 'react'
import Analytics from 'analytics'
import { AnalyticsProvider } from 'use-analytics'
// @ts-ignore
import googleAnalytics from '@analytics/google-analytics'

/* Initialize analytics & load plugins */
const analytics = Analytics({
  app: 'soliface',
  plugins: [
    googleAnalytics({
      measurementIds: ['G-CGEH9LZ6FH']
    })
  ]
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

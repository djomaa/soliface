import React from 'react'

import Alert from '@mui/material/Alert'
import AlertTitle from '@mui/material/AlertTitle'
import CircularProgress from '@mui/material/CircularProgress'

import { useLogger } from 'hooks/use-logger'
import { AbiCoderError } from 'contexts/web3'
import { IAction } from 'hooks/use-async-action'

export function parseActionError(error: unknown): { title: string, body: JSX.Element } {
  if (error instanceof AbiCoderError) {
    return {
      title: error.message,
      body: <>{error.details}</>
    }
  }
  if (error instanceof Error) {
    return {
      title: 'Unexpected error',
      body: <>{error.toString()}</>
    }
  } else {
    return {
      title: 'Unregonized error',
      body: <>Error is in the console</>
    }
  }
}

interface IAlterProps {
  title: JSX.Element | string
  body: JSX.Element | string
}
export const ResultError: React.FC<IAlterProps> = ({ title, body }) => {
  return (
    <Alert severity='error'>
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  )
}

export const ResultWarning: React.FC<IAlterProps> = ({ title, body }) => {
  return (
    <Alert severity='warning'>
      <AlertTitle>{title}</AlertTitle>
      {body}
    </Alert>
  )
}

export const ResultSuccess: React.FC<IAlterProps> = ({ title, body }) => {
  return (
    <Alert severity='success' variant='outlined'
      sx={{
        '& .MuiAlert-message': {
          width: '100%'
        }
      }}
    >
      <AlertTitle>
        {title}
      </AlertTitle>
      {body}
    </Alert>
  )
}

export const ResultLoading: React.FC<IAlterProps> = ({ title, body }) => {
  return (
    <Alert
      icon={<CircularProgress size={20} />}
      severity='info'
      variant='outlined'>
      <AlertTitle>
        {title}
      </AlertTitle>
      {body}
    </Alert>

  )
}

interface iProps {
  action?: IAction<any>
  title?: JSX.Element
  body?: JSX.Element
  onSuccess?: JSX.Element
}

export const BaseResult: React.FC<iProps> = (props) => {
  const { action, title, body } = props

  const [logger] = useLogger(BaseResult)

  if (action == null) {
    logger.log('Empty action')
    return <></>
  }

  if (action.loading) {
    logger.log('Loading..')
    return <></>
  }

  if (action.error) {
    logger.log('Failure')
    const { title, body } = parseActionError(action.error)
    return (
      <Alert severity='error'>
        <AlertTitle>{title}</AlertTitle>
        {body}
      </Alert>
    )
  }

  if (!action.result) {
    throw new Error('BaseResult: No result')
  }

  return (
    <>
      <Alert severity='success' variant='outlined'
        sx={{
          '& .MuiAlert-message': {
            width: '100%'
          }
        }}
      >
        <AlertTitle>
          {title}
        </AlertTitle>
        {body}
      </Alert>
    </>
  )
}

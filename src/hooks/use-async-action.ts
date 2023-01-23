import { useCallback, useState } from 'react'
import { useLogger } from './use-logger'

interface iState<T = any> {
  id: number
  loading: boolean
  error: any
  result: T | undefined
}

export type IAction<T> = iState<T>

let id = 1
export const useAsyncAction = <
  TFn extends ((...args: any[]) => Promise<any>),
  TArgs extends Parameters<TFn>,
  TResult extends Awaited<ReturnType<TFn>>,
>(oAction: TFn, memo?: any[]): [iState<TResult> | undefined, (...p: TArgs) => void] => {
  const [logger] = useLogger(useAsyncAction)
  const [state, setState] = useState<iState<TResult>>()
  const update = (update: Partial<iState<TResult>>) => {
    setState((prev) => {
      return {
        ...prev ?? { id: 0, loading: false, error: undefined, result: undefined },
        ...update
      }
    })
  }
  const action = (memo != null) ? useCallback(oAction, memo) : oAction
  const perform = useCallback((...params: TArgs) => {
    logger.log('Performing')
    update({ id, loading: true, error: undefined, result: undefined })
    id += 1
    action(...params)
      .then((result) => {
        logger.log('Completed')
        update({ result, error: undefined })
      })
      .catch((error) => {
        logger.log('Failed')
        update({ error })
      })
      .finally(() => {
        logger.log('Finished')
        update({ loading: false })
      })
  }, [action])

  return [state, perform]
}

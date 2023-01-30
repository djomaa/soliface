import React from 'react'
import { AsyncState } from 'react-use/lib/useAsyncFn'

import { LoadingToast } from './loading.toast'
import { SuccessToast } from './success.toast'
import { ErrorModal } from '../shared'

type ComponentKey<T extends string> = `${T}Component`;
type TextKey<T extends string> = `${T}Text`;
type ComponentOrText<Field extends string> = { [k in ComponentKey<Field>]: React.ReactElement } | { [k in TextKey<Field>]: string }

// function componentOrText<T extends string>(obj: ComponentOrText<T>, key: T, TextComponent: React.ReactElement<{ text: string }>) {
//   // typechecking not working? can't get why, so just ignoring
//   const componentKey: ComponentKey<T> = `${key}Component`;
//   if (componentKey in obj) {
//     // @ts-ignore
//     return obj[componentKey];
//   } else {
//     const textKey: TextKey<T> = `${key}Text`;
//     // @ts-ignore
//     return <TextComponent text={obj[textKey]} />;
//   }
// }

type IProps = ComponentOrText<'loading'> & ComponentOrText<'error'> & ComponentOrText<'success'> & {
  state: AsyncState<unknown>;
  onClose?: () => void;
}

export const StateToast: React.FC<IProps> = ({ state, ...props }) => {
  if (state.loading) {
    return 'loadingComponent' in props
      ? props.loadingComponent
      : <LoadingToast text={props.loadingText} />
  }

  if (state.error) {
    return 'errorComponent' in props
      ? props.errorComponent
      : <ErrorModal title={props.errorText} error={state.error} onClose={props.onClose} />
    // : <ErrorToast text={props.errorText} />
  }

  return 'successComponent' in props
    ? props.successComponent
    : <SuccessToast text={props.successText} onClose={props.onClose} />
}

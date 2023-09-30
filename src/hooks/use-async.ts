import React from 'react';
import { useAsyncState } from './use-async-state';

type AsyncState<V, E> = {
  loading: false;
  error: undefined;
  value: V;
} | {
  loading: true;
  error: undefined;
  value: undefined;
} | {
  loading: false;
  error: E;
  value: undefined;
}

type OnDestroyCb = () => void;
type SetDesctructor = (onDestroy: OnDestroyCb) => void;
type EffectCallbackParams = {
  onDestroy: SetDesctructor;
  isMounted: () => boolean;
  isLatest: () => boolean;
  check: () => boolean;
}
type EffectCallback<V> = (params: EffectCallbackParams) => Promise<V>;

export function useAsync<V, E = Error>(
  effect: EffectCallback<V>,
  deps: any[]
): AsyncState<V, E> {
  const state = useAsyncState<V, E>()
  const lastCallId = React.useRef(0);

  React.useEffect(() => {
    let mounted = true;
    const callId = ++lastCallId.current;

    let onDestroyCb: OnDestroyCb | undefined;
    const isMounted = () => mounted;
    const isLatest = () => callId === lastCallId.current;
    const onDestroy = (cb: OnDestroyCb) => { onDestroyCb = cb };
    const check = () => isMounted() && isLatest();
    const params: EffectCallbackParams = {
      isMounted,
      isLatest,
      check,
      onDestroy
    }

    state.setValue(undefined);
    if (!state.loading) {
      state.setLoading(true);
    }

    effect(params)
      .then((v) => {
        if (!check()) {
          return;
        }
        state.setLoading(false);
        state.setError(undefined);
        state.setValue(v);
      })
      .catch((error) => {
        if (!check()) {
          return;
        }
        state.setLoading(false);
        state.setError(error);
      })

    return () => {
      if (onDestroyCb) {
        onDestroyCb();
      }
      mounted = false;
    };
  }, deps);

  return state;
}
